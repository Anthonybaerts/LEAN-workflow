import React from 'react';
import { ClientsScreen } from '@/ui/screens';
import { clientsRepository, ClientEntity } from '@/services/clientsRepository';
import { useRouter } from 'expo-router';

export default function ClientsIndex() {
  const router = useRouter();
  const [clients, setClients] = React.useState<ClientEntity[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const unsub = clientsRepository.observeListByOwnerId(undefined, setClients);
    return () => unsub();
  }, []);

  const filtered = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((c) => (c.name || '').toLowerCase().includes(q));
  }, [clients, searchQuery]);

  return (
    <ClientsScreen
      hideEmbeddedNav
      items={filtered.map((c) => ({
        id: c.id!,
        name: c.name,
        type: c.type,
        contactPerson: c.notes, // best-effort until dedicated field exists
        phone: c.phone,
        address: [c.addressLine, c.postalCode, c.city].filter(Boolean).join(', '),
      }))}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      onAddClientPress={() => router.push('/(tabs)/clients/new-client')}
      onClientPress={(clientId) =>
        router.push({ pathname: '/(tabs)/clients/[clientId]', params: { clientId } })
      }
    />
  );
}


