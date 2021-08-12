import React from 'react';

export const ViewportContext = React.createContext();

export const MonthContext = React.createContext();

export const ProjectContext = React.createContext();

export const PollingContext = React.createContext();

export default function GlobalContextProvider({ children }) {
  const isMobile = window.innerWidth <= 575;

  const [month, setMonth] = React.useState(new Date().getMonth());

  const [project, setProject] = React.useState(null);

  const [isPolling, setIsPolling] = React.useState(false);

  return (
    <ViewportContext.Provider value={{ isMobile }}>
      <MonthContext.Provider value={{ month, setMonth }}>
        <ProjectContext.Provider value={{ project, setProject }}>
          <PollingContext.Provider value={{ isPolling, setIsPolling }}>
            {children}
          </PollingContext.Provider>
        </ProjectContext.Provider>
      </MonthContext.Provider>
    </ViewportContext.Provider>
  );
}
