# UI Library Documentation - Obytes React Native Template

## Overview

This React Native app is built on the **Obytes React Native Template**, a production-ready starter kit featuring modern development practices and a comprehensive UI component library. The template provides a solid foundation with authentication, navigation, theming, and internationalization already implemented.

## Architecture

### Tech Stack
- **Framework**: React Native with Expo (SDK 53)
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **State Management**: Zustand + MMKV for persistence
- **Forms**: React Hook Form + Zod validation
- **API**: React Query (TanStack Query) + Axios
- **Internationalization**: i18next + react-i18next
- **Testing**: Jest + React Testing Library
- **Icons**: React Native SVG with custom icon components

### Project Structure
```
app-ui/src/
├── app/                    # Expo Router screens
│   ├── (app)/             # Authenticated app screens
│   ├── feed/              # Feed-related screens
│   ├── login.tsx          # Login screen
│   └── onboarding.tsx     # Onboarding screen
├── components/            # Reusable components
│   ├── ui/               # Core UI components
│   ├── settings/         # Settings-specific components
│   └── [feature].tsx     # Feature components
├── api/                   # API layer (React Query)
├── lib/                   # Utilities and hooks
└── translations/          # i18n files
```

## Available Screens

### Authentication Flow
1. **Onboarding Screen** (`/onboarding`)
   - First-time user introduction
   - App features showcase
   - Navigation to login

2. **Login Screen** (`/login`)
   - Form-based authentication
   - Input validation with Zod
   - Error handling and feedback

### Main Application
1. **Feed Screen** (`/` - Home)
   - Post listing with FlashList
   - Pull-to-refresh functionality
   - Empty state handling
   - Navigation to post details

2. **Post Detail Screen** (`/feed/[id]`)
   - Individual post view
   - Dynamic routing with parameters

3. **Add Post Screen** (`/feed/add-post`)
   - Post creation form
   - Form validation

4. **Settings Screen** (`/settings`)
   - Theme switching (light/dark)
   - Language selection
   - App preferences

5. **Style Guide Screen** (`/style`)
   - Component showcase
   - Design system documentation
   - Development reference

## Component Library

### Core UI Components

#### Form Components
- **Button**: Primary action button with variants and loading states
- **Input**: Text input with validation, error states, and accessibility
- **Select**: Dropdown selection with search capabilities  
- **Checkbox**: Boolean input with custom styling

#### Display Components
- **Text**: Typography component with semantic variants
- **Image**: Optimized image component using Expo Image
- **Modal**: Full-screen and bottom sheet modals
- **ProgressBar**: Loading and progress indicators

#### Layout Components
- **View**: Enhanced React Native View with styling
- **SafeAreaView**: Safe area handling across devices
- **List**: FlashList wrapper with optimizations
- **FocusAwareStatusBar**: Status bar that adapts to screen focus

### Feature Components

#### Authentication
- **LoginForm**: Complete login form with validation
  - Email/password inputs
  - Form validation with Zod
  - Error handling and display
  - Loading states

#### Content
- **Card**: Post display component
  - Image support
  - Title and description
  - Action buttons
  - Responsive layout

- **Cover**: Hero/onboarding visual component

#### Settings
- **SettingsItem**: Individual setting row
- **SettingsContainer**: Settings group wrapper
- **LanguageItem**: Language selection component
- **ThemeItem**: Theme switching component

### Showcase Components
- **Buttons**: Button variants demonstration
- **Colors**: Color palette showcase
- **Inputs**: Input components demonstration
- **Typography**: Text styling examples

## Icons

### Available Icons
Located in `app-ui/src/components/ui/icons/`:
- `arrow-right`, `caret-down`, `feed`, `github`, `home`
- `language`, `rate`, `settings`, `share`, `style`
- `support`, `website`

### Usage
```tsx
import { HomeIcon, SettingsIcon } from '@/components/ui/icons';

<HomeIcon className="w-6 h-6 text-gray-600" />
```

## Styling System

### NativeWind (TailwindCSS)
- Full TailwindCSS utility classes
- Dark mode support with `dark:` prefix
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Custom design tokens in `tailwind.config.js`

### Theme Support
- Light/dark mode switching
- System preference detection
- Persistent theme selection
- Consistent color tokens

### Example Usage
```tsx
<View className="flex-1 bg-white dark:bg-gray-900 p-4">
  <Text className="text-lg font-semibold text-gray-900 dark:text-white">
    Hello World
  </Text>
</View>
```

## State Management

### Authentication (Zustand + MMKV)
```tsx
import { useAuth } from '@/lib';

const { signIn, signOut, user } = useAuth();
```

### API Data (React Query)
```tsx
import { usePosts, usePost } from '@/api';

const { data, isLoading, error } = usePosts();
```

### Forms (React Hook Form + Zod)
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

## Navigation

### Expo Router File-Based Routing
- Automatic route generation from file structure
- Dynamic routes with `[param]` syntax
- Route groups with `(group)` syntax
- Layout files with `_layout.tsx`

### Navigation Examples
```tsx
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate to screens
router.push('/feed/123');
router.replace('/login');
router.back();
```

## Internationalization

### i18next Setup
- English and Arabic translations included
- RTL support for Arabic
- Namespace organization
- Pluralization support

### Usage
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<Text>{t('welcome.title')}</Text>
```

## Development Features

### Testing
- Jest configuration with React Native preset
- React Testing Library setup
- Component unit tests included
- Test utilities and mocks

### Code Quality
- ESLint with comprehensive rules
- Prettier for code formatting
- Husky for git hooks
- Lint-staged for pre-commit checks
- TypeScript strict mode

### Build & Deploy
- Multi-environment support (dev/staging/production)
- EAS Build configuration
- GitHub Actions workflows
- Automated testing and deployment

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended package manager)
- Expo CLI
- iOS Simulator / Android Emulator

### Installation
```bash
cd app-ui
pnpm install
```

### Development
```bash
# Start development server
pnpm start

# Run on iOS
pnpm ios

# Run on Android  
pnpm android

# Run tests
pnpm test
```

## Best Practices

### Component Development
1. Use TypeScript for all components
2. Follow the established component patterns
3. Include proper accessibility props
4. Write unit tests for complex logic
5. Use Tailwind classes for styling
6. Implement proper error boundaries

### State Management
1. Use Zustand for global app state
2. Use React Query for server state
3. Use React Hook Form for form state
4. Keep component state local when possible

### Performance
1. Use FlashList for large lists
2. Implement proper memoization
3. Optimize images with Expo Image
4. Use lazy loading for screens
5. Monitor bundle size

### Accessibility
1. Add accessibility labels and hints
2. Ensure proper focus management
3. Test with screen readers
4. Maintain adequate color contrast
5. Support dynamic text sizing

This UI library provides a solid foundation for building production-ready React Native applications with modern development practices and comprehensive component coverage.
