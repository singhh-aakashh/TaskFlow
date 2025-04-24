import Logs from "@/components/icons/clipboard";
import Home from "@/components/icons/home";

import Workflows from "@/components/icons/workflows";

export const menuOptions = [
    { name: 'Dashboard', Component: Home, href: '/dashboard' },
    { name: 'Workflows', Component: Workflows, href: '/flow/create' },
    { name: 'zaps', Component: Logs, href: '/flow/all' },
  ]
