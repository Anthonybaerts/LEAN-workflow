import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets, SafeAreaView, type Edge } from 'react-native-safe-area-context';
import {
  Header,
  Input,
  CustomerCard,
  TabButton,
  RoundButton,
  EmptyState,
} from '../../components';
import {
  Search,
  Calendar,
  Group,
  AddUser,
  Briefcase,
  User,
  Call,
  Location,
  ChevronRight,
} from '../../icons';
import { theme } from '../../tokens';

// Context: Displays the main clients list screen with search functionality,
// client cards showing contact details, and navigation to add new clients
type ClientItem = {
  id: string;
  name: string;
  type?: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
};

type ClientsScreenProps = {
  hideEmbeddedNav?: boolean;
  items?: ClientItem[];
  searchQuery?: string;
  onSearchQueryChange?: (value: string) => void;
  onAddClientPress?: () => void;
  onClientPress?: (clientId: string) => void;
};

export function ClientsScreen({
  hideEmbeddedNav = false,
  items,
  searchQuery: controlledSearch,
  onSearchQueryChange,
  onAddClientPress,
  onClientPress,
}: ClientsScreenProps) {
  const insets = useSafeAreaInsets();
  const safeAreaEdges: Edge[] = hideEmbeddedNav ? ['top'] : ['top', 'bottom'];
  const [uncontrolledSearch, setUncontrolledSearch] = React.useState('');
  const searchQuery = controlledSearch ?? uncontrolledSearch;
  const setSearchQuery = onSearchQueryChange ?? setUncontrolledSearch;

  // Sample client data - in real app this would come from props/state management
  const sampleClients: ClientItem[] = [
    {
      id: '1',
      name: 'Bakker Appartementen',
      type: 'Zakelijk',
      contactPerson: 'Mevr. Emma Bakker',
      phone: '+31 6 45678901',
      address: 'Herengracht 89, Amsterdam',
    },
    {
      id: '2',
      name: 'De Vries Woonhuis',
      type: 'Particulier',
      contactPerson: 'Dhr. Johan de Vries',
      phone: '+31 6 34567890',
      address: 'Prinsengracht 45, Amsterdam',
    },
    {
      id: '3',
      name: 'Jansen Installatiewerken',
      type: 'Zakelijk',
      contactPerson: 'Mevr. Lisa Jansen',
      phone: '+31 6 23456789',
      address: 'Keizersgracht 123, Amsterdam',
    },
  ];

  const clients = items ?? sampleClients;

  const handleAddClient = () => {
    if (onAddClientPress) return onAddClientPress();
    // Context fallback
    console.log('Navigate to add client');
  };

  const handleClientPress = (clientId: string) => {
    if (onClientPress) return onClientPress(clientId);
    // Context fallback
    console.log('Navigate to client details:', clientId);
  };

  const handleTabPress = (tab: 'calendar' | 'clients') => {
    // Context: Handle bottom navigation tab selection
    console.log('Navigate to:', tab);
  };

  return (
    <SafeAreaView style={styles.container} edges={safeAreaEdges}>
      {/* Context: Main header with screen title */}
      <Header title="Klanten" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          {/* Context: Search input for filtering clients */}
          <Input
            leftIcon={<Search width={20} height={20} />}
            placeholder="Zoek klanten..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Context: Section header showing total client count */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Alle Klanten</Text>
          <View style={styles.countRow}>
            <Text style={styles.count}>{clients.length}</Text>
            <Text style={styles.countLabel}>klanten in totaal</Text>
          </View>
        </View>

        {/* Context: Separator line between header and content */}
        <View style={styles.separator} />

        {/* Context: List of client cards displaying contact information */}
        <View style={styles.clientsList}>
          {clients.length === 0 ? (
            <EmptyState
              title="No clients yet"
              description="Add your first client to get started."
              actionLabel="Add client"
              onAction={handleAddClient}
              iconName="AddUser"
            />
          ) : (
            clients.map((client) => (
              <CustomerCard
                key={client.id}
                title={client.name}
                subtitle={client.type}
                subtitleIcon={<Briefcase width={20} height={20} />}
                chevronIcon={<ChevronRight width={20} height={20} />}
                onPress={() => handleClientPress(client.id)}
                items={[
                  {
                    icon: <User width={16} height={16} />,
                    text: client.contactPerson ?? '',
                    isEmpty: !client.contactPerson,
                  },
                  {
                    icon: <Call width={16} height={16} />,
                    text: client.phone ?? '',
                    isEmpty: !client.phone,
                  },
                  {
                    icon: <Location width={16} height={16} />,
                    text: client.address ?? '',
                    isEmpty: !client.address,
                  },
                ]}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Context: Bottom navigation with Calendar and Clients tabs (embedded mock) */}
      {hideEmbeddedNav ? null : (
        <View style={styles.bottomNav}>
          <TabButton
            icon={<Calendar width={28} height={28} />}
            label="Kalender"
            onPress={() => handleTabPress('calendar')}
          />
          <TabButton
            icon={<Group width={28} height={28} />}
            label="Klanten"
            active
            onPress={() => handleTabPress('clients')}
          />
        </View>
      )}

      {/* Context: Floating action button to add new clients */}
      <View style={[styles.fab, { bottom: (hideEmbeddedNav ? insets.bottom : insets.bottom) + 8 }]}> 
        <RoundButton
          icon={<AddUser width={28} height={28} />}
          onPress={handleAddClient}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[900],
  },
  content: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[6],
    paddingBottom: theme.spacing[3],
  },
  sectionHeader: {
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[3],
  },
  sectionTitle: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing[1],
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  count: {
    color: theme.colors.gray[500],
    fontSize: 14,
    fontWeight: '400',
  },
  countLabel: {
    color: theme.colors.gray[500],
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.gray[700],
    marginBottom: theme.spacing[3],
  },
  clientsList: {
    paddingHorizontal: theme.spacing[5],
    gap: theme.spacing[3],
    paddingBottom: theme.spacing[5],
  },
  emptyText: {
    color: theme.colors.gray[400],
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[700],
    backgroundColor: theme.colors.gray[900],
    gap: theme.spacing[5],
  },
  fab: {
    position: 'absolute',
    right: theme.spacing[8],
  },
});
