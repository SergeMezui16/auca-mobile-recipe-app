import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText } from 'react-native';

import { cn } from '@/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = SlottableTextProps & {
  font?: 'roboto' | 'rosarivo';
  size?: 'sm' | 'md' | 'lg';
};

const Text = React.forwardRef<TextRef, TextProps>(
  ({ className, font = 'rosarivo', size = 'md', asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          'text-base text-foreground web:select-text',
          textClass,
          className,
          {
            'font-[roboto]': font === 'roboto',
            'font-[rosarivo]': font === 'rosarivo',
          },
          {
            'text-sm': size === 'sm',
            'text-md': size === 'md',
            'text-lg': size === 'lg',
          }
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };
