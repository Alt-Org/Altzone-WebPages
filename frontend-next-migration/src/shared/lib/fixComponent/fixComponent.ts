//Function to fix vite's some libraries import problems
export function fixComponent<T>(component: T): T {
    return (component as any).default ?? component;
}