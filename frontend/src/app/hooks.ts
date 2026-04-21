import type { RootState } from "../app/store";

export const selectCurrentWorkspace = (state: RootState) => state.workspace.currentWorkspace;
export const selectTheme = (state: RootState) => state.theme.theme;
