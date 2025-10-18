import * as React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Header,
  Button,
  ClientBanner,
  ContactDetailsCard,
  RecentTasksCard,
  NotesCard,
  Tag,
} from '../../components';
import {
  ArrowLeft,
  ThreeDotsVertical,
  Call,
  Email,
  Add,
  ContactCard,
  Pencil,
  Clock,
  User,
  Location,
  Trash,
} from '../../icons';
import { theme } from '../../tokens';
import { clientsRepository, type ClientEntity } from '../../../services/clientsRepository';
import { tasksRepository, type TaskEntity } from '../../../services/tasksRepository';
import { resolveVariant } from '@/ui/theme/taskColors';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useToast } from '../../components';

type Props = {
  clientId?: string;
};

// Context: Displays detailed client information with contact details,
// recent tasks, notes, and quick action buttons
export function ClientInfoScreen({ clientId }: Props) {
  const router = useRouter();
  const { success: toastSuccess, error: toastError } = useToast();
  const [client, setClient] = React.useState<ClientEntity | null>(null);
  const [recentTasks, setRecentTasks] = React.useState<
    {
      name: string;
      date: string;
      time: string;
      color: 'blue' | 'green' | 'yellow' | 'gray';
      tag?: { label: string; color: 'blue' | 'green' | 'yellow' | 'gray' };
    }[]
  >([]);

  React.useEffect(() => {
    if (!clientId) {
      setClient(null);
      return;
    }
    const unsubscribe = clientsRepository.observeById(clientId, (c) => {
      setClient(c);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [clientId]);

  React.useEffect(() => {
    if (!clientId) {
      setRecentTasks([]);
      return;
    }
    const unsubscribe = tasksRepository.observeListByClientId(
      clientId,
      undefined,
      (tasks: TaskEntity[]) => {
        const toEpoch = (t: TaskEntity) => {
          const [y, m, d] = (t.date ?? '1970-01-01').split('-').map((n) => parseInt(n, 10));
          const [hh, mm] = (t.startAt ?? '00:00').split(':').map((n) => parseInt(n, 10));
          return new Date(y || 1970, (m || 1) - 1, d || 1, hh || 0, mm || 0).getTime();
        };

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formatDate = (ymd?: string) => {
          if (!ymd) return '';
          const [y, m, d] = ymd.split('-').map((n) => parseInt(n, 10));
          if (!y || !m || !d) return ymd;
          return `${d} ${months[m - 1]} ${y}`;
        };

        const items = [...tasks]
          .sort((a, b) => toEpoch(b) - toEpoch(a))
          .slice(0, 5)
          .map((t) => ({
            name: t.description || 'Taak',
            date: formatDate(t.date),
            time: t.startAt || '',
            color: resolveVariant(t.type),
          } as const));
        setRecentTasks(items);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [clientId]);

  const clientName = client?.name ?? 'Client';
  const contactPhone = client?.phone ?? '';
  const contactEmail = client?.email ?? '';
  const addressLine = client?.addressLine ?? '';
  const city = client?.city ?? '';
  const postalCode = client?.postalCode ?? '';
  const fullAddress = [addressLine, postalCode, city].filter(Boolean).join(', ');

  const notes = React.useMemo(() => {
    if (!client?.notes) return [] as { text: string; date: string }[];
    if (Array.isArray(client.notes)) {
      return (client.notes as unknown[])
        .map((n) => (typeof n === 'string' ? { text: n, date: '' } : null))
        .filter(Boolean) as { text: string; date: string }[];
    }
    if (typeof client.notes === 'string') {
      return [{ text: client.notes, date: '' }];
    }
    return [] as { text: string; date: string }[];
  }, [client?.notes]);

  const contactDetails = [
    {
      icon: <User width={20} height={20} />,
      label: 'Contactpersoon',
      text: clientName,
      isEmpty: !clientName,
    },
    {
      icon: <Call width={20} height={20} />,
      label: 'Telefoon',
      text: contactPhone,
      isEmpty: !contactPhone,
    },
    {
      icon: <Email width={20} height={20} />,
      label: 'E-mail',
      text: contactEmail,
      isEmpty: !contactEmail,
    },
    {
      icon: <Location width={20} height={20} />,
      label: 'Adres',
      text: fullAddress,
      isEmpty: !fullAddress,
    },
  ];

  const handleBack = () => {
    try {
      router.back();
    } catch {
      // noop fallback
    }
  };

  const handleMenu = () => {
    // Placeholder for actions menu
    console.log('Menu pressed');
  };

  const handleCall = () => {
    if (!contactPhone) return;
    const url = `tel:${contactPhone}`;
    Linking.openURL(url).catch(() => {
      // best-effort, avoid crash
    });
  };

  const handleEmail = () => {
    if (!contactEmail) return;
    const url = `mailto:${contactEmail}`;
    Linking.openURL(url).catch(() => {
      // best-effort, avoid crash
    });
  };

  const handleAddTask = () => {
    try {
      router.push({ pathname: '/(tabs)/calendar/new-task', params: clientId ? { clientId } : {} } as any);
    } catch {
      // noop fallback
    }
  };

  const handleEditContact = () => {
    try {
      if (clientId) {
        router.push({ pathname: '/(tabs)/clients/edit-client', params: { clientId } } as any);
      }
    } catch {
      // noop fallback
    }
  };

  const handleViewAllTasks = () => {
    try {
      router.push('/(tabs)/calendar' as any);
    } catch {
      // noop fallback
    }
  };

  const handleAddNote = () => {
    // Context: Navigate to add new note
    console.log('Add note');
  };

  const confirmAndDelete = React.useCallback(() => {
    if (!clientId) return;
    Alert.alert(
      'Bevestigen',
      'Weet je zeker dat je deze klant wilt verwijderen?',
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Verwijderen',
          style: 'destructive',
          onPress: async () => {
            try {
              const tasks = await tasksRepository.listByClientId(clientId);
              if ((tasks?.length ?? 0) > 0) {
                toastError(
                  `Klant heeft ${(tasks?.length ?? 0)} gekoppelde taken. Verwijder of verplaats taken eerst.`
                );
                return;
              }
              await clientsRepository.delete(clientId);
              toastSuccess('Klant verwijderd');
              router.replace('/(tabs)/clients' as any);
            } catch (e) {
              toastError('Verwijderen mislukt. Probeer opnieuw.');
            }
          },
        },
      ]
    );
  }, [clientId, router, toastError, toastSuccess]);

  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
      {/* Context: Header with navigation and client name */}
      <Header
        title={clientName}
        leftIcon={<ArrowLeft width={28} height={28} />}
        onLeftPress={handleBack}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Context: Client information banner with status */}
        <View style={styles.bannerSection}>
          <ClientBanner
            name={clientName}
            type={client?.type}
            date={undefined}
            tagLabel={undefined}
            tagColor="green"
            onDelete={confirmAndDelete}
          />
        </View>

        {/* Context: Quick action buttons for communication and tasks */}
        <View style={styles.actionsSection}>
          <View style={styles.separator} />
          <View style={styles.actionButtons}>
            <Button
              variant="secondary"
              size="large"
              icon={<Call width={24} height={24} />}
              onPress={handleCall}
              style={styles.actionButton}
            >
              Bellen
            </Button>
            <Button
              variant="secondary"
              size="large"
              icon={<Email width={24} height={24} />}
              onPress={handleEmail}
              style={styles.actionButton}
            >
              E-mail
            </Button>
            <Button
              variant="secondary"
              size="large"
              icon={<Add width={24} height={24} />}
              onPress={handleAddTask}
              style={styles.actionButton}
            >
              Taak
            </Button>
          </View>
          <View style={styles.separator} />
        </View>

        {/* Context: Cards section with contact, tasks, and notes */}
        <View style={styles.cardsSection}>
          {/* Context: Contact details with edit functionality */}
          <ContactDetailsCard
            title="Contactgegevens"
            titleIcon={<ContactCard width={20} height={20} />}
            editIcon={<Pencil width={20} height={20} />}
            items={contactDetails}
            onEdit={handleEditContact}
          />

          {/* Context: Recent tasks with status indicators */}
          <RecentTasksCard
            title="Recente Taken"
            titleIcon={<Clock width={20} height={20} />}
            actionText="All Taken"
            tasks={recentTasks}
            onActionPress={handleViewAllTasks}
          />

          {/* Context: Client notes and add note functionality */}
          <NotesCard
            title="Notities"
            titleIcon={<ContactCard width={20} height={20} />}
            addButtonText="+ Notitie toevoegen"
            notes={notes}
            onAddNote={handleAddNote}
          />
        </View>
      </ScrollView>

      {/* bottom delete button removed per design */}
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
  bannerSection: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[5],
    paddingBottom: theme.spacing[10],
  },
  actionsSection: {
    gap: theme.spacing[4],
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.gray[700],
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing[5],
    gap: theme.spacing[3],
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
  },
  cardsSection: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[5],
    gap: theme.spacing[4],
  },
});
