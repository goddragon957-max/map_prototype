## Shadcn migration cleanup plan

1. Remove the MUI app shell (`ThemeProvider`, `CssBaseline`) so rendering no longer depends on Material UI.
2. Initialize shadcn in-place and keep the generated config/utilities as the new UI baseline.
3. Replace shared wrappers (`Box`, `Button`, `Typography`) with DOM/shadcn-backed implementations that preserve current call sites.
4. Rewrite direct MUI usages (`Toast`, `SubmitModal`, ag-grid renderer styles) with local/shadcn primitives.
5. Remove MUI theme/dependencies and verify with TypeScript and production build.
