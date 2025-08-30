# Frontend Structure - Incultura

## Improved Component Architecture

### Layout Components (`/src/components/layout/`)
- **AppLayout.js** - Main application layout wrapper with background decorations
- **AppHeader.js** - Reusable header with navigation and authentication
- **AppFooter.js** - Reusable footer component

### Common Components (`/src/components/common/`)
- **PageHeader.js** - Reusable page headers with title, subtitle, badge, and user info
- **StatsGrid.js** - Grid layout for displaying statistics
- **FilterTabs.js** - Reusable tab filter component
- **CallToAction.js** - Call-to-action section component
- **FloatingElements.js** - Animated floating decorative elements
- **SearchBar.js** - Search input with clear functionality
- **Modal.js** - Modal dialog component
- **Card.js** - Card component with Header, Body, Footer variants
- **FormField.js** - Form input components with validation
- **LoadingStates.js** - Loading and empty state components

### Page-Specific Components (`/src/components/[page]/`)
- **leaderboard/** - Leaderboard-specific components
  - **LeaderboardTable.js** - Complete leaderboard table
  - **LeaderboardPodium.js** - Top 3 podium display
  - **LeaderboardList.js** - List of remaining users

### Custom Hooks (`/src/hooks/`)
- **useLeaderboard.js** - Hook for leaderboard data management
- **useScrollAnimation.js** - Existing scroll animation hook
- **useFetch.js** - Existing fetch hook

## Benefits of This Structure

### 1. **Reusability**
- Components can be used across multiple pages
- Consistent UI patterns throughout the application
- Reduced code duplication

### 2. **Maintainability**
- Smaller, focused components are easier to maintain
- Clear separation of concerns
- Easier to test individual components

### 3. **Scalability**
- Easy to add new features without affecting existing code
- Modular architecture supports team development
- Clear file organization makes finding code simple

### 4. **Performance**
- Smaller components load faster
- Better tree-shaking with modular imports
- Easier to implement code splitting

## Usage Examples

### Using the new layout:
```jsx
import { AppLayout } from '../../components/layout/AppLayout'

export default function MyPage() {
  return (
    <AppLayout>
      <div className="content">
        {/* Your page content */}
      </div>
    </AppLayout>
  )
}
```

### Using common components:
```jsx
import { 
  PageHeader, 
  StatsGrid, 
  FilterTabs,
  SearchBar,
  Card 
} from '../../components/common'

// Use in your component
<PageHeader 
  title="My Page" 
  subtitle="Page description"
  badge={{ icon: <Icon />, text: "Badge text" }}
/>
```

### Using custom hooks:
```jsx
import { useLeaderboard } from '../../hooks/useLeaderboard'

function MyComponent() {
  const { list, loading, getUserRank } = useLeaderboard()
  // Use the data
}
```

## Migration Guide

### For existing pages:
1. Replace the full page layout with `<AppLayout>`
2. Extract repeated UI patterns into reusable components
3. Move data fetching logic to custom hooks
4. Use common components for consistent styling

### Before:
```jsx
// 400+ lines of code with duplicated header/footer
export default function Page() {
  // Large monolithic component
}
```

### After:
```jsx
// Clean, focused component
import { AppLayout } from '../../components/layout/AppLayout'
import { PageHeader, StatsGrid } from '../../components/common'

export default function Page() {
  return (
    <AppLayout>
      <PageHeader {...headerConfig} />
      <StatsGrid stats={statsData} />
      {/* More reusable components */}
    </AppLayout>
  )
}
```

## Next Steps

1. **Apply this structure to other pages** (quiz, articles, marketplace)
2. **Create more specialized components** as needed
3. **Add TypeScript support** for better type safety
4. **Implement design system tokens** for consistent theming
5. **Add component documentation** with Storybook or similar
6. **Create unit tests** for reusable components
