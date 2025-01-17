import React from 'react';
import { FamilyMember } from '../types/family';
import { Calendar, User, X, Heart, Users, Baby } from 'lucide-react';

interface MemberCardProps {
  member: FamilyMember;
  onClose: () => void;
}

export function MemberCard({ member, onClose }: MemberCardProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
        
        <div className="flex items-center space-x-4 mb-6">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-4 ring-emerald-50"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-emerald-400" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{member.name}</h2>
            {member.birthDate && (
              <div className="flex items-center text-slate-500 mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(member.birthDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            )}
          </div>
        </div>

        {member.bio && (
          <p className="text-slate-600 mb-6 leading-relaxed">{member.bio}</p>
        )}

        <div className="space-y-4 divide-y divide-slate-100">
          {member.parentIds.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center text-slate-700 mb-2">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">Parents</span>
              </div>
              <div className="text-slate-600 pl-7">
                {member.parentIds.join(', ')}
              </div>
            </div>
          )}
          
          {member.spouseIds.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center text-slate-700 mb-2">
                <Heart className="w-5 h-5 mr-2 text-rose-500" />
                <span className="font-medium">Spouse</span>
              </div>
              <div className="text-slate-600 pl-7">
                {member.spouseIds.join(', ')}
              </div>
            </div>
          )}
          
          {member.childrenIds.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center text-slate-700 mb-2">
                <Baby className="w-5 h-5 mr-2 text-emerald-500" />
                <span className="font-medium">Children</span>
              </div>
              <div className="text-slate-600 pl-7">
                {member.childrenIds.join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}