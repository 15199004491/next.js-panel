interface RouteConfig {
  path: string;
  allowRegionSwitch: boolean;
}

export const routeConfigs: RouteConfig[] = [
  { path: '/newhouses', allowRegionSwitch: true },
  { path: '/developers', allowRegionSwitch: true },
  { path: '/resale', allowRegionSwitch: true },
  { path: '/rentals', allowRegionSwitch: true },
];

export const isRegionSwitchAllowed = (currentPath: string): boolean => {
  return routeConfigs.some(config => {
    if (!config.allowRegionSwitch) return false;
    return currentPath === config.path;
  });
};