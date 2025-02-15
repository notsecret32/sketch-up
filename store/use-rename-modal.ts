import { create } from 'zustand';

import { Id } from '@/convex/_generated/dataModel';

interface IValues {
  id: Id<'boards'> | null;
  title: string;
}

const initialValues: IValues = {
  id: null,
  title: '',
};

interface IRenameModal {
  isOpen: boolean;
  initialValues: IValues;
  onOpen: (opts: IValues) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModal>(set => ({
  isOpen: false,
  initialValues,
  onOpen: ({ id, title }) =>
    set({
      isOpen: true,
      initialValues: { id, title },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues,
    }),
}));
