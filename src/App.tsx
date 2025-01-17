import React, { useState } from 'react';
import { FamilyTree } from './components/FamilyTree';
import { MemberCard } from './components/MemberCard';
import { FamilyMember } from './types/family';
import { Trees as Tree, Search, ZoomIn, ZoomOut } from 'lucide-react';

// Sample family data remains the same
const sampleFamilyData: FamilyMember[] = [/* ... existing data ... */];

function App() {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = searchQuery
    ? sampleFamilyData.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleFamilyData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Tree className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                Family Tree
              </h1>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search family members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 h-[800px] relative overflow-hidden">
          <div className="absolute top-6 right-6 flex space-x-2 z-10">
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors">
              <ZoomOut className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors">
              <ZoomIn className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          <FamilyTree 
            data={filteredData}
            onMemberClick={setSelectedMember}
          />
        </div>
      </main>

      {selectedMember && (
        <MemberCard
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}

export default App;