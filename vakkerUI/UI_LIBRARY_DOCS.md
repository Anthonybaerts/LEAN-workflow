# Vakker UI Library Documentation

## Overview

Vakker is a React Native UI library designed for client management mobile apps. This library provides design tokens, icons, and components that follow the Vakker design system.

## Installation & Setup

### Import Path Alias

Add this to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@ui/*": ["src/ui/*"]
    }
  }
}
```

### Usage

```tsx
import { theme, Search, User } from '@ui';
// or
import { Search } from '@ui/icons';
import { colors } from '@ui/tokens';
```

## Design Tokens

### Colors

```tsx
import { colors } from '@ui/tokens';

// Primary colors
colors.primary.main; // #2774F1
colors.primary.light; // #4285F3

// Success
colors.success.main; // #4CAF50

// Grayscale
colors.gray[900]; // #0F1C2D (darkest)
colors.gray[100]; // #E5E7EB (lightest)

// Semantic colors
colors.text.primary; // #0F1C2D
colors.background.primary; // #FFF
```

### Spacing

```tsx
import { spacing } from '@ui/tokens';

spacing[1]; // 4px
spacing[2]; // 8px
spacing[3]; // 12px
spacing[4]; // 16px
spacing[5]; // 20px
spacing[6]; // 24px
spacing[8]; // 32px
spacing[10]; // 40px
```

### Radius

```tsx
import { radius } from '@ui/tokens';

radius.sm; // 4px
radius.md; // 6px
radius.lg; // 8px
radius.xl; // 12px
radius.pill; // 9999px
radius.circle; // 9999px
```

### Typography

```tsx
import { typography } from '@ui/tokens';

typography.fontSize.xs; // 12
typography.fontSize.sm; // 14
typography.fontSize.base; // 16
typography.fontSize.lg; // 18
typography.fontSize.xl; // 20

typography.fontWeight.normal; // '400'
typography.fontWeight.semibold; // '600'
typography.fontWeight.bold; // '700'
```

## Icons

All icons are React Native SVG components with consistent props:

### Props

- `size?: number` - Sets both width and height (default varies per icon)
- `color?: string` - Fill color (default varies per icon)
- `width?: number` - Override width
- `height?: number` - Override height
- `...SvgProps` - Additional react-native-svg props

### Available Icons

#### Navigation & Actions

- `Search` - Search icon (default: 20x20, #D1D5DB)
- `ArrowLeft` - Left arrow (default: 28x28, white)
- `ChevronRight` - Right chevron (default: 20x20, #4285F3)
- `Add` - Plus icon (default: 24x24, white)
- `Close` - X icon (default: 16x16, #9CA3AF)

#### People & Social

- `User` - Single user (default: 16x16, #4285F3)
- `AddUser` - Add user (default: 28x28, white)
- `Group` - Multiple users (default: 28x28, #4285F3)

#### Communication

- `Call` - Phone (default: 16x16, #4285F3)
- `Email` - Mail (default: 24x24, white)
- `ContactCard` - Business card (default: 20x20, #4285F4)

#### Business & Objects

- `Briefcase` - Work/business (default: 20x20, #4285F3)
- `Location` - Map pin (default: 16x16, #4285F3)
- `Calendar` - Date (default: 28x28, #9CA3AF)
- `Clock` - Time (default: 20x20, #4285F4)
- `Lock` - Security (default: 20x20, #4285F3)
- `Pencil` - Edit (default: 20x20, #4285F4)

#### Interface

- `ThreeDotsVertical` - Menu (default: 28x28, white)

### Icon Examples

```tsx
import { Search, User, ArrowLeft } from '@ui/icons';

// Default usage
<Search />

// Custom size and color
<User size={24} color="#FF0000" />

// Individual width/height
<ArrowLeft width={32} height={32} color="#4285F3" />
```

## Components

### Button

Main button component with multiple variants and states.

**Props:**

- `children: string` - Button text content
- `variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text'` - Visual variant (default: 'primary')
- `size?: 'large' | 'medium'` - Button size (default: 'large')
- `icon?: React.ReactNode` - Icon to display alongside text
- `showIcon?: boolean` - Whether to show the icon (default: true)
- `disabled?: boolean` - Disabled state (default: false)
- `style?: ViewStyle` - Custom container style
- `...TouchableOpacityProps` - All standard TouchableOpacity props

**Examples:**

```tsx
import { Button, Call } from '@ui';

// Basic usage
<Button variant="primary" size="large">
  Primary Button
</Button>

// With icon
<Button variant="secondary" icon={<Call />}>
  Call Now
</Button>

// Text only variant
<Button variant="text" showIcon={false}>
  Text Button
</Button>
```

### RoundButton

Circular button component designed for icons.

**Props:**

- `icon: React.ReactNode` - Icon to display in the button
- `disabled?: boolean` - Disabled state (default: false)
- `style?: ViewStyle` - Custom container style
- `...TouchableOpacityProps` - All standard TouchableOpacity props

**Examples:**

```tsx
import { RoundButton, AddUser } from '@ui';

<RoundButton icon={<AddUser />} />

<RoundButton
  icon={<AddUser />}
  disabled
  onPress={() => console.log('pressed')}
/>
```

### TabButton

Tab button component with icon and label support.

**Props:**

- `label: string` - Tab label text
- `icon?: React.ReactNode` - Icon to display above the label
- `showIcon?: boolean` - Whether to show the icon (default: true)
- `active?: boolean` - Active state (default: false)
- `style?: ViewStyle` - Custom container style
- `...TouchableOpacityProps` - All standard TouchableOpacity props

**Examples:**

```tsx
import { TabButton, User } from '@ui';

<TabButton
  label="Profile"
  icon={<User />}
  active
/>

<TabButton
  label="Settings"
  icon={<User />}
  showIcon={false}
  onPress={() => console.log('tab pressed')}
/>
```

### TabSelection

Tab selection component with circular indicator and color variants.

**Props:**

- `label: string` - Selection label text
- `color?: 'blue' | 'green' | 'yellow' | 'gray'` - Color variant (default: 'blue')
- `active?: boolean` - Active/selected state (default: false)
- `style?: ViewStyle` - Custom container style
- `...TouchableOpacityProps` - All standard TouchableOpacity props

**Examples:**

```tsx
import { TabSelection } from '@ui';

<TabSelection
  label="Option 1"
  color="blue"
  active
/>

<TabSelection
  label="Option 2"
  color="green"
  onPress={() => console.log('selected')}
/>
```

### Input

Search input component with multiple states and icon styles.

**Props:**

- `placeholder?: string` - Placeholder text (default: 'Placeholder')
- `leftIcon?: React.ReactNode` - Left side icon
- `rightIcon?: React.ReactNode` - Right side icon
- `showLeftIcon?: boolean` - Whether to show the left icon (default: true)
- `showRightIcon?: boolean` - Whether to show the right icon (default: false)
- `iconStyle?: 'simple' | 'bordered'` - Icon style variant (default: 'simple')
- `state?: 'default' | 'selected' | 'typing' | 'filled'` - Input state (auto-detected if not provided)
- `containerStyle?: ViewStyle` - Custom container style
- `style?: ViewStyle` - Custom input style
- `...TextInputProps` - All standard TextInput props

**Examples:**

```tsx
import { Input, Search } from '@ui';

<Input placeholder="Search..." leftIcon={<Search />} iconStyle="bordered" />;
```

### Header

Navigation header with back button, title, and menu actions.

**Props:**

- `title: string` - Header title text
- `leftIcon?: React.ReactNode` - Left side icon (usually back arrow)
- `rightIcon?: React.ReactNode` - Right side icon (usually menu or action)
- `onLeftPress?: () => void` - Handler for left icon press
- `onRightPress?: () => void` - Handler for right icon press
- `style?: ViewStyle` - Custom container style

**Examples:**

```tsx
import { Header, ArrowLeft, ThreeDotsVertical } from '@ui';

<Header
  title="Contact Details"
  leftIcon={<ArrowLeft />}
  rightIcon={<ThreeDotsVertical />}
  onLeftPress={() => navigation.goBack()}
/>;
```

### Card

Base card container component.

**Props:**

- `children: React.ReactNode` - Card content
- `style?: ViewStyle` - Custom container style
- `padding?: keyof typeof theme.spacing` - Card padding (default: 4)

**Examples:**

```tsx
import { Card } from '@ui';

<Card>
  <Text>Card content</Text>
</Card>;
```

### ContactDetailsCard

Contact details card with edit functionality.

**Props:**

- `title: string` - Card title
- `titleIcon?: React.ReactNode` - Title icon
- `editIcon?: React.ReactNode` - Edit icon
- `items: ContactDetailsItem[]` - Contact details items
- `onEdit?: () => void` - Edit button press handler
- `style?: ViewStyle` - Custom container style

**Examples:**

```tsx
import { ContactDetailsCard, ContactCard, User, Call, Pencil } from '@ui';

<ContactDetailsCard
  title="Contact Details"
  titleIcon={<ContactCard />}
  editIcon={<Pencil />}
  onEdit={() => console.log('edit')}
  items={[
    { icon: <User />, label: 'Contact Person', text: 'John Doe' },
    { icon: <Call />, label: 'Phone', text: '(555) 123-4567' },
  ]}
/>;
```

### CustomerCard

Customer/client card with navigation.

**Props:**

- `title: string` - Card title
- `subtitle?: string` - Subtitle text
- `subtitleIcon?: React.ReactNode` - Subtitle icon
- `chevronIcon?: React.ReactNode` - Navigation/chevron icon
- `items: CustomerItem[]` - Customer items
- `onPress?: () => void` - Card press handler
- `style?: ViewStyle` - Custom container style

**Examples:**

```tsx
import { CustomerCard, Briefcase, User, ChevronRight } from '@ui';

<CustomerCard
  title="Enterprise Client"
  subtitle="Business Services"
  subtitleIcon={<Briefcase />}
  chevronIcon={<ChevronRight />}
  onPress={() => navigation.navigate('Details')}
  items={[{ icon: <User />, text: 'John Smith' }]}
/>;
```

### RecentTasksCard

Recent tasks card with task items and tags.

**Props:**

- `title: string` - Card title
- `titleIcon?: React.ReactNode` - Title icon
- `actionText?: string` - Action link text
- `tasks: TaskItem[]` - Task items
- `onActionPress?: () => void` - Action press handler
- `style?: ViewStyle` - Custom container style

**Examples:**

```tsx
import { RecentTasksCard, Clock } from '@ui';

<RecentTasksCard
  title="Recent Tasks"
  titleIcon={<Clock />}
  actionText="View All"
  tasks={[
    {
      name: 'Follow up call',
      date: 'Jan 15',
      time: '2:30 PM',
      color: 'blue',
      tag: { label: 'Complete', color: 'green' },
    },
  ]}
/>;
```

### NotesCard

Notes card with note items and add note button.

**Props:**

- `title: string` - Card title
- `titleIcon?: React.ReactNode` - Title icon
- `addButtonText?: string` - Add button text (default: "+ Add Note")
- `notes: NoteItem[]` - Note items
- `onAddNote?: () => void` - Add note handler
- `style?: ViewStyle` - Custom container style

**Examples:**

```tsx
import { NotesCard, Pencil } from '@ui';

<NotesCard
  title="Notes"
  titleIcon={<Pencil />}
  onAddNote={() => console.log('add note')}
  notes={[{ text: 'Client meeting went well', date: 'Jan 15, 2024' }]}
/>;
```

### Tag

Tag/label component with color variants.

**Props:**

- `label: string` - Tag label text
- `color?: 'blue' | 'green' | 'yellow' | 'gray'` - Tag color variant (default: 'blue')
- `style?: ViewStyle` - Custom container style

**Examples:**

```tsx
import { Tag } from '@ui';

<Tag label="Completed" color="green" />
<Tag label="Pending" color="yellow" />
```

### Note

Note item with text and date.

**Props:**

- `text: string` - Note text content
- `date: string` - Note date
- `style?: ViewStyle` - Custom container style

**Examples:**

```tsx
import { Note } from '@ui';

<Note text="Client meeting went well" date="Jan 15, 2024" />;
```

## Screens

Complete screen implementations using Vakker UI components. Each screen demonstrates how to compose components together to create functional app screens.

### ClientsScreen

Main clients list screen with search functionality, client cards, and navigation.

**Components Used:**

- `Header` - Screen title "Klanten"
- `Input` - Search input with Search icon
- `CustomerCard` - Client information display
- `TabButton` - Bottom navigation (Calendar/Clients)
- `RoundButton` - Floating add client button

**Component Mapping:**

```tsx
// Header (title only)
<Header title="Klanten" />

// Search input
<Input
  icon={<Search />}
  placeholder="Zoek klanten..."
  value={searchQuery}
  onChangeText={setSearchQuery}
/>

// Customer cards
<CustomerCard
  title="Bakker Appartementen"
  clientType="Zakelijk"
  contactPerson="Mevr. Emma Bakker"
  phone="+31 6 45678901"
  address="Herengracht 89, Amsterdam"
  onPress={() => handleClientPress('1')}
/>

// Bottom navigation
<TabButton
  icon={<Calendar />}
  label="Kalender"
  onPress={() => handleTabPress('calendar')}
/>
<TabButton
  icon={<Group />}
  label="Klanten"
  active
  onPress={() => handleTabPress('clients')}
/>

// Floating action button
<RoundButton
  icon={<AddUser />}
  onPress={handleAddClient}
/>
```

**Screen Structure:**

- Header with screen title
- Search input for filtering clients
- Section header with client count
- List of client cards with contact information
- Bottom navigation tabs
- Floating add button

**Example Usage:**

```tsx
import { ClientsScreen } from '@ui/screens';

export function App() {
  return <ClientsScreen />;
}
```

### ClientInfoScreen

Detailed client information screen with contact details, recent tasks, notes, and quick action buttons.

**Components Used:**

- `Header` - Navigation with back button, client name title, and menu
- `ClientBanner` - Client information display with status tag
- `Button` - Action buttons for Call, Email, and Add Task (secondary variant)
- `ContactDetailsCard` - Contact information with edit functionality
- `RecentTasksCard` - Task history with status indicators
- `NotesCard` - Client notes with add note functionality

**Component Mapping:**

```tsx
// Header with navigation
<Header
  title="Bakker Appartementen"
  leftIcon={<ArrowLeft />}
  rightIcon={<ThreeDotsVertical />}
  onLeftPress={handleBack}
  onRightPress={handleMenu}
/>

// Client banner with status
<ClientBanner
  name="Bakker Appartementen"
  type="Zakelijk"
  date="Sinds 2019"
  tagLabel="Actief"
  tagColor="green"
/>

// Action buttons
<Button variant="secondary" size="large" icon={<Call />}>
  Bellen
</Button>
<Button variant="secondary" size="large" icon={<Email />}>
  E-mail
</Button>
<Button variant="secondary" size="large" icon={<Add />}>
  Taak
</Button>

// Contact details
<ContactDetailsCard
  title="Contactgegevens"
  titleIcon={<ContactCard />}
  editIcon={<Pencil />}
  items={contactDetails}
  onEdit={handleEditContact}
/>

// Recent tasks
<RecentTasksCard
  title="Recente Taken"
  titleIcon={<Clock />}
  actionText="All Taken"
  tasks={recentTasks}
  onActionPress={handleViewAllTasks}
/>

// Notes
<NotesCard
  title="Notities"
  titleIcon={<ContactCard />}
  addButtonText="+ Notitie toevoegen"
  notes={notes}
  onAddNote={handleAddNote}
/>
```

**Screen Structure:**

- Header with navigation and client name
- Client information banner with status tag
- Action buttons row for quick communication and task creation
- Contact details card with edit functionality
- Recent tasks card with task history and status
- Notes card with client notes and add functionality

**Example Usage:**

```tsx
import { ClientInfoScreen } from '@ui/screens';

export function App() {
  return <ClientInfoScreen />;
}
```

### NewClientScreen

Form screen for adding a new client with type selection and contact details input fields.

**Components Used:**

- Custom Header - Navigation with back button, title, and save text button
- Custom Tab Buttons - Client type selection (Zakelijk/Particulier) with icons
- `Input` - Form fields with bordered icon style and filled state
- `Button` - Save and Cancel actions (primary and outline variants)

**Component Mapping:**

```tsx
// Custom header with text button
<View style={styles.header}>
  <TouchableOpacity onPress={handleBack}>
    <ArrowLeft />
  </TouchableOpacity>
  <Text>Nieuwe Klant</Text>
  <TouchableOpacity onPress={handleSave}>
    <Text style={styles.saveText}>Opslaan</Text>
  </TouchableOpacity>
</View>

// Custom client type selection
<TouchableOpacity
  style={[styles.tabButton, active && styles.activeTab]}
  onPress={() => setClientType('business')}
>
  <Briefcase />
  <Text>Zakelijk</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[styles.tabButton, active && styles.activeTab]}
  onPress={() => setClientType('personal')}
>
  <User />
  <Text>Particulier</Text>
</TouchableOpacity>

// Form inputs with bordered icons
<Input
  placeholder="Voer naam in"
  leftIcon={<User />}
  rightIcon={hasValue ? <Close /> : undefined}
  showRightIcon={hasValue}
  iconStyle="bordered"
  state="filled"
/>

<Input
  placeholder="voorbeeld@email.com"
  leftIcon={<Email />}
  iconStyle="bordered"
  state="filled"
  keyboardType="email-address"
/>

// Action buttons
<Button variant="primary" size="large" showIcon={false}>
  Opslaan
</Button>
<Button variant="outline" size="large" showIcon={false}>
  Annuleren
</Button>
```

**Screen Structure:**

- Header with back navigation and save action
- Client type selection with Zakelijk/Particulier tabs
- Form fields for name, email, phone, address, and postal code
- All inputs use bordered icon style with appropriate icons
- Action buttons for save and cancel

**Form Fields:**

- **Naam** - Name input with User icon
- **E-mailadres** - Email input with Email icon
- **Telefoonnummer** - Phone input with Call icon
- **Adres** - Address input with Location icon
- **Postcode en Plaats** - Postal code input with Location icon

**Example Usage:**

```tsx
import { NewClientScreen } from '@ui/screens';

export function App() {
  return <NewClientScreen />;
}
```

### CalendarScreen

Calendar screen displaying monthly overview with time-based schedule and events.

**Components Used:**

- `Header` - Screen title display
- `TimeSlot` - Individual time slot with events
- `Calendar` (icon) - Calendar placeholder icon
- `ChevronLeft`, `ChevronRight` - Month navigation
- `Pencil` - Date edit icon
- `Group` - Bottom navigation icon

**Props:**

- `selectedDate?: string` - Currently selected date (default: "Donderdag, 2 November")
- `selectedMonth?: string` - Current month display (default: "November 2023")
- `onDateEdit?: () => void` - Date edit handler
- `onPrevMonth?: () => void` - Previous month navigation handler
- `onNextMonth?: () => void` - Next month navigation handler

**Examples:**

```tsx
import { CalendarScreen } from '@ui/screens';

// Basic usage
<CalendarScreen />

// With custom handlers
<CalendarScreen
  selectedDate="Vrijdag, 3 November"
  selectedMonth="December 2023"
  onDateEdit={() => console.log('edit date')}
  onPrevMonth={() => console.log('previous month')}
  onNextMonth={() => console.log('next month')}
/>

// Time slots with events
// The screen displays events for different time slots:
// 07:00 - Jansen Inst... (yellow), Bakker App... (blue)
// 09:00 - De Vries Woonh... (green)
// 11:00 - Jansen Inst... (yellow), Bakker App... (blue)
// 13:00 - Client Name ... (gray)
```

**Screen Structure:**

- Main header with "Kalender" title
- Month navigation header with arrows and month/year
- Calendar placeholder area (dashed border with instructional text)
- Date selection bar with current date and edit icon
- Time slots list (06:00 - 13:00) with color-coded events
- Bottom navigation with active calendar tab

**Event Colors:**

- **Yellow** - Jansen installations
- **Blue** - Bakker applications
- **Green** - De Vries housing
- **Gray** - General client events

**Example Usage:**

```tsx
import { CalendarScreen } from '@ui/screens';

export function App() {
  return <CalendarScreen />;
}
```

### NewTaskScreen

New task creation screen with time selection, client selection, work type options, and description.

**Components Used:**

- `Header` - Navigation with back button and save text button
- `HourSelector` - Start and end time selection
- `InfoCard` - Duration display with clock icon
- `Input` - Client search and description fields
- `TabSelection` - Work type selection (4 colored options)
- `Button` - Save and cancel actions
- `ArrowLeft`, `User`, `Close`, `Pencil` - Various icons

**Props:**

- `selectedDate?: string` - Selected date display (default: "Donderdag, 2 November 2023")
- `startTime?: string` - Start time (default: "08:00")
- `endTime?: string` - End time (default: "09:00|")
- `duration?: string` - Duration text (default: "Duur: 1 uur")
- `selectedWorkType?: WorkType` - Selected work type (default: "maintenance")
- `clientQuery?: string` - Client search query (default: "")
- `description?: string` - Task description (default: "")
- Various handlers for interactions

**Work Types:**

- **Onderhoud** (Maintenance) - Blue, default active
- **Project** - Yellow
- **Klantenbezoek** (Client Visit) - Green
- **Vrije Taak** (Free Task) - Gray

**Examples:**

```tsx
import { NewTaskScreen } from '@ui/screens';

// Basic usage
<NewTaskScreen />

// With custom handlers
<NewTaskScreen
  selectedDate="Vrijdag, 3 November 2023"
  startTime="10:00"
  endTime="11:30"
  duration="Duur: 1.5 uur"
  selectedWorkType="project"
  onBack={() => console.log('go back')}
  onSave={() => console.log('save task')}
  onWorkTypeSelect={(type) => console.log('work type:', type)}
/>
```

**Screen Structure:**

- Header with back navigation and "Opslaan" save button
- Date display header
- Time selection with start/end selectors and duration info
- Client search input with user icon
- Work type selection grid (2x2) with colored indicators
- Description textarea with placeholder
- Action buttons: "Taak Opslaan" (primary) and "Annuleren" (outline)

**Form Fields:**

- **Time Selection** - Visual time pickers with selected state
- **Client** - Search input with bordered user icon and clear button
- **Work Type** - Grid of 4 colored options with circle indicators
- **Description** - Multiline textarea with clear functionality

**Example Usage:**

```tsx
import { NewTaskScreen } from '@ui/screens';

export function App() {
  return <NewTaskScreen />;
}
```

### LoginScreen

Authentication screen with email/password form and logo placeholder for user login.

**Components Used:**

- `Header` - Screen title display
- `Input` - Email and password input fields with icons
- `Button` - Login action and forgot password link
- `Email`, `Lock` - Input field icons

**Props:**

- `email?: string` - Email input value (default: "")
- `password?: string` - Password input value (default: "")
- `onEmailChange?: (email: string) => void` - Email change handler
- `onPasswordChange?: (password: string) => void` - Password change handler
- `onLogin?: () => void` - Login button handler
- `onForgotPassword?: () => void` - Forgot password handler

**Examples:**

```tsx
import { LoginScreen } from '@ui/screens';

// Basic usage
<LoginScreen />

// With handlers
<LoginScreen
  email="user@example.nl"
  password=""
  onEmailChange={(email) => setEmail(email)}
  onPasswordChange={(password) => setPassword(password)}
  onLogin={() => handleLogin()}
  onForgotPassword={() => handleForgotPassword()}
/>
```

**Screen Structure:**

- Header with "Login" title
- Logo placeholder area (dashed border rectangle)
- Email input field with email icon and Dutch placeholder
- Password input field with lock icon and secure text entry
- Primary "Inloggen" (Login) button
- Text "Wachtwoord vergeten?" (Forgot password) link
- Footer with copyright text

**Form Fields:**

- **E-mailadres** - Email input with email icon, placeholder "voorbeeld@email.nl"
- **Wachtwoord** - Password input with lock icon, placeholder "Voer je wachtwoord in"

**Authentication Features:**

- Secure password input (masked text)
- Email keyboard type for email field
- No auto-capitalization/correction for email
- Simple icon style (no bordered backgrounds)

**Example Usage:**

```tsx
import { LoginScreen } from '@ui/screens';

export function App() {
  return <LoginScreen />;
}
```

## TypeScript

The library is fully typed with TypeScript. All design tokens export their types:

```tsx
import type { Colors, Spacing, Theme } from '@ui/tokens';
```

## Development

### File Structure

```
src/ui/
├── tokens/           # Design tokens
│   ├── colors.ts
│   ├── spacing.ts
│   ├── radius.ts
│   ├── typography.ts
│   ├── theme.ts
│   └── index.ts
├── icons/            # SVG icon components
│   ├── Search.tsx
│   ├── User.tsx
│   ├── ...
│   └── index.ts
└── index.ts          # Main export
```

### Adding New Icons

1. Convert Figma SVG to React Native component
2. Use consistent Props interface with `size`, `color`
3. Add proper JSDoc documentation with examples
4. Export from `icons/index.ts`

### Design Token Updates

Update tokens in their respective files under `src/ui/tokens/`. The theme automatically combines all tokens.
