export type ClassName = {
  className?: string;
};

export type PropsWithClassName<T> = T & ClassName;
