import React, { Fragment, PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export interface SimpleRouterDefinition {
  path: string;
  element: React.ReactNode;
};

export interface SimpleRouterProps {
  routers: SimpleRouterDefinition[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bodyLayout?: React.ElementType | string;
};

export const useLayout = (header?: React.ReactNode, footer?: React.ReactNode, bodyLayout?: React.ElementType | string) => {
  if (header || footer || bodyLayout) {
    const BodyLayout = bodyLayout || Fragment;

    const Layout: React.FC<PropsWithChildren> = ({ children }) => {
      return (
        <div>
          {header}
          <BodyLayout>{children}</BodyLayout>
          {footer}
        </div>
      )
    }

    return Layout
  }

  return Fragment;
}

const SimpleRouter: React.FC<SimpleRouterProps> = (props) => {
  const Layout = useLayout(props.header, props.footer, props.bodyLayout);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {props.routers.map((router, index) => (
            <Route key={index} path={router.path} element={router.element} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default SimpleRouter;
