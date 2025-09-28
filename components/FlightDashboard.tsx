
import React from 'react';
import { MOCK_FLIGHTS } from '../constants';
import { Flight, EvaluationStatus } from '../types';
import ScreenContainer from './ScreenContainer';

interface FlightDashboardProps {
  onSelectFlight: (flight: Flight) => void;
}

const FlightCard: React.FC<{ flight: Flight; onSelect: (flight: Flight) => void }> = ({ flight, onSelect }) => {
  const isNotEntered = flight.status === EvaluationStatus.NotEntered;
  const statusBgColor = isNotEntered ? 'bg-red-500' : 'bg-gray-400';
  const cardSelectableClasses = isNotEntered ? 'cursor-pointer hover:shadow-lg hover:border-blue-400' : 'opacity-70';

  return (
    <div
      onClick={() => isNotEntered && onSelect(flight)}
      className={`flex items-center p-4 bg-white rounded-lg shadow-sm border transition-all ${cardSelectableClasses}`}
    >
      <img src={flight.student.photoUrl} alt={flight.student.name} className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-grow mx-4">
        <p className="text-lg font-bold text-gray-800">{flight.student.name}</p>
        <p className="text-sm text-gray-600">{flight.courseName}</p>
        <p className="text-md font-semibold text-blue-700 mt-1">{flight.subjectName}</p>
      </div>
      <div className={`text-white text-sm font-bold px-3 py-1 rounded-full ${statusBgColor}`}>
        {flight.status}
      </div>
    </div>
  );
};

const FlightDashboard: React.FC<FlightDashboardProps> = ({ onSelectFlight }) => {
  const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <ScreenContainer title="フライト評価ダッシュボード">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">{today}</h2>
      </div>
      <div className="space-y-4">
        {MOCK_FLIGHTS.map(flight => (
          <FlightCard key={flight.id} flight={flight} onSelect={onSelectFlight} />
        ))}
      </div>
    </ScreenContainer>
  );
};

export default FlightDashboard;
