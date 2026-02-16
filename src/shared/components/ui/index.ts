/**
 * UI Components Index
 *
 * Centralized exports for all shared UI components.
 * This allows for clean imports like: import { Button, Card } from '@/shared/components/ui'
 */

// Core UI Components
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
export { Alert, AlertDescription, AlertTitle } from './alert';
export { Avatar, AvatarFallback, AvatarImage } from './avatar';
export { Badge, badgeVariants } from './badge';
export { Button, buttonVariants } from './button';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
export { Checkbox } from './checkbox';
export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible';

// Dialog & Modal Components
export { ConfirmationDialog } from './confirmation-dialog';
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

// Navigation Components
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './navigation-menu';
export { Pagination } from './pagination';

// Form Components
export { Input } from './input';
export { Label } from './label';
export { RadioGroup, RadioGroupItem } from './radio-group';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';
export { Switch } from './switch';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
export { Textarea } from './textarea';

// Layout & Display Components
export { ScrollArea, ScrollBar } from './scroll-area';
export { Separator } from './separator';
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

// Visual Components
export { Fade } from './fade';
export { Progress } from './progress';
export { Skeleton } from './skeleton';
export { ToastContainer } from './toast-container';

// Utility Components
export { ExternalLink } from './external-link';

// Re-export component types for TypeScript
export type { ButtonProps } from './button';
export type { CardProps } from './card';
export type { InputProps } from './input';
export type { LabelProps } from './label';
