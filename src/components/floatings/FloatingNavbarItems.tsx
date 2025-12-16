"";

import React, { useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingFocusManager,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FloatingNavbarItems: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange(isOpen, event, reason) {
      console.log(isOpen, event, reason);
      setIsOpen(isOpen);
    },
    strategy: "fixed",
    transform: true,
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);


  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const setReference = React.useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node);
    },
    [refs]
  );

  const setFloating = React.useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs]
  );

  const options = {
    home: {
      path: "/",
      label: "Ana Sayfa"
    },
    about: {
      path: "/about",
      label: "Hakkımda"
    },
    blog: {
      path: "/blog",
      label: "Blog"
    },
    contact: {
      path: "/contact",
      label: "İletişim"
    }
  };

  const activePath = usePathname();
  const activeOption = Object.entries(options).find(([_key, value]) => value.path === activePath);

  return (
    <>
      <button
        ref={setReference}
        className={clsx('w-10 h-10 flex flex-col items-center justify-center duration-300',
          isOpen && 'rotate-90 gap-2.5',
          !isOpen && 'gap-1.5'
        )}
        {...getReferenceProps()}
      >
        <div className="w-6 h-[2px] bg-neutral-50 flex items-center justify-center" />
        <div className="w-6 h-[2px] bg-neutral-50 flex items-center justify-center" />
        <div className="w-6 h-[2px] bg-neutral-50 flex items-center justify-center" />
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className='w-full border border-gray-300 rounded-md min-w-[150px] max-w-[400px] h-auto flex flex-col items-center justify-center bg-neutral-50 hover:bg-black divide-y-2 divide-y divide-base-primary'
          >
            {Object.entries(options).map(([key, value], idx) => (
              <Link
                key={key}
                href={value.path}
                onMouseDown={() => setTimeout(() => setIsOpen(false), 300)}
                className={clsx(
                  "w-full inline-block text-center text-sm font-normal px-4 py-2 color-black bg-neutral-50 hover:text-neutral-50 hover:bg-black duration-300",
                  idx === 0 && 'rounded-t-md',
                  idx === Object.entries(options).length - 1 && 'rounded-b-md',
                  activeOption && activeOption[0] === key && 'opacity-75 cursor-not-allowed pointer-events-none'
                )}
              >
                {value.label}
              </Link>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}

export default FloatingNavbarItems