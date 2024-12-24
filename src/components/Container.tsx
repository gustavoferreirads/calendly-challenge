import React, { ReactNode } from 'react';

type ContainerProps = {
    className?: string;
    children: ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
    return (
        <main className={`flex justify-center items-center px-4 ${className}`}>
            <div
                className={`
          bg-white
          box-border
          text-[rgb(10,37,64)]
          font-['Proxima Nova',sans-serif]
          text-[16px]
          leading-[24px]
          max-w-[1060px]
          min-w-[420px]
          w-full
          h-full
          min-h-[350px]
          relative
          break-words
          antialiased
          mt-4
          mx-0
          transition-all duration-[220ms] ease-out
          shadow-[0_1px_8px_rgba(0,0,0,0.08)]
          lg:w-fit
          lg:h-[500px]
          sm:mt-20
          sm:border sm:border-[rgba(26,26,26,0.1)]
          sm:rounded-[8px]
          lg:mt-20
          lg:border lg:border-[rgba(26,26,26,0.1)]
          lg:rounded-[8px]
        `}
            >
                {children}
            </div>
        </main>
    );
};

export default Container;
