interface ElementContainer2Props {
  children: React.ReactNode;
  className: string;
}

const ElementContainer2 = ({ children, className }: ElementContainer2Props) => {
  return (
    <div
      className={`flex rounded-4xl bg-white gap-3 w-fit items-center justify-center px-3 ${className}`}
    >
      {children}
    </div>
  );
};
export default ElementContainer2;
