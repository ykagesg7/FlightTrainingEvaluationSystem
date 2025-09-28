
import React, { useState, useCallback } from 'react';
import { Screen, Flight, EvaluationData } from './types';
import Header from './components/Header';
import LmsTopPage from './components/LmsTopPage';
import ExecuteMenu from './components/ExecuteMenu';
import FlightDashboard from './components/FlightDashboard';
import EvaluationForm from './components/EvaluationForm';
import ApprovalScreen from './components/ApprovalScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LMS_TOP);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [evaluationData, setEvaluationData] = useState<EvaluationData | null>(null);

  const handleNavigate = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
  }, []);
  
  const handleSelectFlight = useCallback((flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentScreen(Screen.EVALUATION_FORM);
  }, []);
  
  const handleFormSubmit = useCallback((data: EvaluationData) => {
    setEvaluationData(data);
    setCurrentScreen(Screen.APPROVAL_SCREEN);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedFlight(null);
    setEvaluationData(null);
    setCurrentScreen(Screen.FLIGHT_DASHBOARD);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LMS_TOP:
        return <LmsTopPage onNavigate={() => handleNavigate(Screen.EXECUTE_MENU)} />;
      case Screen.EXECUTE_MENU:
        return <ExecuteMenu onNavigate={() => handleNavigate(Screen.FLIGHT_DASHBOARD)} />;
      case Screen.FLIGHT_DASHBOARD:
        return <FlightDashboard onSelectFlight={handleSelectFlight} />;
      case Screen.EVALUATION_FORM:
        if (selectedFlight) {
          return <EvaluationForm flight={selectedFlight} onSubmit={handleFormSubmit} onBack={() => handleNavigate(Screen.FLIGHT_DASHBOARD)} />;
        }
        // Fallback if no flight is selected
        return <FlightDashboard onSelectFlight={handleSelectFlight} />;
      case Screen.APPROVAL_SCREEN:
        if (evaluationData) {
          return <ApprovalScreen evaluationData={evaluationData} onApprove={handleBackToDashboard} onEdit={() => setCurrentScreen(Screen.EVALUATION_FORM)} />;
        }
         // Fallback if no data is present
        return <FlightDashboard onSelectFlight={handleSelectFlight} />;
      default:
        return <LmsTopPage onNavigate={() => handleNavigate(Screen.EXECUTE_MENU)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header userName="しゃどー" />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;