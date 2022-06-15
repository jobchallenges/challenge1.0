import { ReactNode } from "react";

interface IViewHeader {
  title: string;
  children: ReactNode;
}

const ViewLayout: React.FC<IViewHeader> = ({ title, children }) => {
  return (
    <div className="container my-6 lg:my-12 px-6 mx-auto ">
      <h4 className="text-2xl font-bold leading-tight text-gray-800 border-b border-gray-300 pb-4 mb-6">{title}</h4>
      {children}
    </div>
  );
};

export default ViewLayout;
