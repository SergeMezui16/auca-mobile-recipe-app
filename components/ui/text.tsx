import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText } from 'react-native';

import { cn } from '@/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = SlottableTextProps & {
  font?: 'roboto' | 'rosarivo';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

const Text = React.forwardRef<TextRef, TextProps>(
  ({ className, font = 'rosarivo', size = 'sm', asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          'text-base text-foreground web:select-text',
          textClass,
          {
            'font-[roboto]': font === 'roboto',
            'font-[rosarivo]': font === 'rosarivo',
          },
          {
            'text-sm': size === 'xs',
            'text-base': size === 'sm',
            'text-lg': size === 'md',
            'text-xl': size === 'lg',
            'text-2xl': size === 'xl',
            'text-4xl': size === '2xl',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };
