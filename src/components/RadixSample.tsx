import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IconChevronRight, IconUser, IconSettings, IconLogout } from '@tabler/icons-react';

export function RadixSample() {
  return (
    <div className="p-8 flex justify-center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
           type='button'
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 transition-colors"
            aria-label="Custom options"
          >
            Radix Dropdown
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] rounded-lg bg-white p-1 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-zinc-900 dark:ring-white/10"
            sideOffset={5}
          >
            <DropdownMenu.Item className="group relative flex h-9 select-none items-center rounded-md px-2 text-sm text-zinc-700 outline-none hover:bg-blue-600 hover:text-white dark:text-zinc-300">
              <IconUser className="mr-2 h-4 w-4" />
              <span>Profil Saya</span>
              <div className="ml-auto pl-5 text-xs text-zinc-400 group-hover:text-white">⌘P</div>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="group relative flex h-9 select-none items-center rounded-md px-2 text-sm text-zinc-700 outline-none hover:bg-blue-600 hover:text-white dark:text-zinc-300">
              <IconSettings className="mr-2 h-4 w-4" />
              <span>Pengaturan</span>
              <div className="ml-auto pl-5 text-xs text-zinc-400 group-hover:text-white">⌘S</div>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />

            <DropdownMenu.Item className="group relative flex h-9 select-none items-center rounded-md px-2 text-sm text-red-600 outline-none hover:bg-red-600 hover:text-white">
              <IconLogout className="mr-2 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className="fill-white dark:fill-zinc-900" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
