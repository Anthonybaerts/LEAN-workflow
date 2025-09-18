import * as React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
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
} from '../../icons';
import { theme } from '../../tokens';

// Context: Displays detailed client information with contact details,
// recent tasks, notes, and quick action buttons
export function ClientInfoScreen() {
  // Sample client data - in real app this would come from props/navigation params
  const clientData = {
    id: '1',
    name: 'Bakker Appartementen',
    type: 'Zakelijk',
    since: 'Sinds 2019',
    status: 'Actief',
    contactPerson: 'Mevr. Emma Bakker',
    phone: '+31 6 45678901',
    email: 'emma@bakker-app.nl',
    address: 'Herengracht 89, Amsterdam',
  };

  const recentTasks = [
    {
      id: '1',
      name: 'Onderhoud verwarmingssysteem',
      date: '15 Jan 2024',
      time: '09:00',
      color: 'blue' as const,
      tag: { label: 'Label', color: 'green' as const },
    },
    {
      id: '2',
      name: 'Renovatie badkamer app 3A',
      date: '22 Jan 2024',
      time: '14:00',
      color: 'yellow' as const,
      tag: { label: 'Label', color: 'green' as const },
    },
    {
      id: '3',
      name: 'Klantbezoek nieuw project',
      date: '28 Jan 2024',
      time: '11:00',
      color: 'green' as const,
      tag: { label: 'Label', color: 'blue' as const },
    },
  ];

  const notes = [
    {
      id: '1',
      text: 'Voorkeur voor werkzaamheden in de ochtend. Altijd vooraf bellen.',
      date: '12 Jan 2024',
    },
    {
      id: '2',
      text: 'Sleutels ophalen bij de receptie. Vraag naar Piet.',
      date: '8 Jan 2024',
    },
  ];

  const contactDetails = [
    {
      icon: <User width={20} height={20} />,
      label: 'Contact Person',
      text: clientData.contactPerson,
    },
    {
      icon: <Call width={20} height={20} />,
      label: 'Telefoon',
      text: clientData.phone,
    },
    {
      icon: <Email width={20} height={20} />,
      label: 'E-mail',
      text: clientData.email,
    },
    {
      icon: <Location width={20} height={20} />,
      label: 'Adres',
      text: clientData.address,
    },
  ];

  const handleBack = () => {
    // Context: Navigate back to clients list
    console.log('Navigate back');
  };

  const handleMenu = () => {
    // Context: Show client actions menu
    console.log('Show menu');
  };

  const handleCall = () => {
    // Context: Initiate phone call to client
    console.log('Call client');
  };

  const handleEmail = () => {
    // Context: Open email client to send email
    console.log('Email client');
  };

  const handleAddTask = () => {
    // Context: Navigate to add new task screen
    console.log('Add task');
  };

  const handleEditContact = () => {
    // Context: Navigate to edit contact details
    console.log('Edit contact');
  };

  const handleViewAllTasks = () => {
    // Context: Navigate to all tasks view
    console.log('View all tasks');
  };

  const handleAddNote = () => {
    // Context: Navigate to add new note
    console.log('Add note');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Context: Header with navigation and client name */}
      <Header
        title={clientData.name}
        leftIcon={<ArrowLeft width={28} height={28} />}
        rightIcon={<ThreeDotsVertical width={28} height={28} />}
        onLeftPress={handleBack}
        onRightPress={handleMenu}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Context: Client information banner with status */}
        <View style={styles.bannerSection}>
          <ClientBanner
            name={clientData.name}
            type={clientData.type}
            date={clientData.since}
            tagLabel={clientData.status}
            tagColor="green"
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
            >
              Bellen
            </Button>
            <Button
              variant="secondary"
              size="large"
              icon={<Email width={24} height={24} />}
              onPress={handleEmail}
            >
              E-mail
            </Button>
            <Button
              variant="secondary"
              size="large"
              icon={<Add width={24} height={24} />}
              onPress={handleAddTask}
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
  },
  cardsSection: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[5],
    gap: theme.spacing[4],
  },
});
