import React, { useState } from 'react';
import { Plus, Trash2, Printer, Calendar, Clock, MapPin, Users, AlignLeft, CheckSquare, Layout } from 'lucide-react';
import './index.css';

export default function App() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    attendees: '',
    topics: '',
    nextMeeting: ''
  });

  const PROJECT_NAME = "Gestão de Frota Contratada - Táxi";

  const [showGuides, setShowGuides] = useState(true);

  const [members, setMembers] = useState([
    { id: 'm1', name: 'Breno', present: false },
    { id: 'm2', name: 'Maria Eduarda', present: false },
    { id: 'm3', name: 'Filipi', present: false },
    { id: 'm4', name: 'Theo', present: false },
    { id: 'm5', name: 'Sofia Rodrigues', present: false },
    { id: 'm6', name: 'Karina', present: false },
    { id: 'm7', name: 'Isaac', present: false },
    { id: 'm8', name: 'Pedro Jacomini (Cliente)', present: false }
    { id: 'm9', name: 'Gabriel (Operações)', present: false }
  ]);
  
  const [customAttendees, setCustomAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState('');

  const [actions, setActions] = useState([
    { id: 1, task: '', owner: '', deadline: '', status: 'Pendente' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleActionChange = (id, field, value) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, [field]: value } : action
    ));
  };

  const addAction = () => {
    const newId = actions.length > 0 ? Math.max(...actions.map(a => a.id)) + 1 : 1;
    setActions([...actions, { id: newId, task: '', owner: '', deadline: '', status: 'Pendente' }]);
  };

  const removeAction = (id) => {
    setActions(actions.filter(action => action.id !== id));
  };

  const toggleMember = (id) => {
    setMembers(members.map(m => m.id === id ? { ...m, present: !m.present } : m));
  };

  const addCustomAttendee = (e) => {
    e.preventDefault();
    if (newAttendee.trim()) {
      setCustomAttendees([...customAttendees, { id: Date.now(), name: newAttendee.trim() }]);
      setNewAttendee('');
    }
  };

  const removeCustomAttendee = (id) => {
    setCustomAttendees(customAttendees.filter(a => a.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const printStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    @media print {
      @page { margin: 0; size: A4 portrait; }
      body { 
        background-color: white; 
        margin: 0; 
        padding: 0; 
        -webkit-print-color-adjust: exact; 
        print-color-adjust: exact; 
        font-family: 'Inter', sans-serif; 
      }
      #app-container { display: block !important; height: auto !important; overflow: visible !important; }
      #form-sidebar { display: none !important; }
      #preview-container { 
        display: block !important;
        width: 100% !important; 
        padding: 0 !important; 
        background: white !important;
        overflow: visible !important;
      }
      #document-page {
        width: 100% !important;
        min-height: auto !important;
        margin: 0 !important;
        padding: 20mm 25mm !important; /* Mantém igual ao ecrã */
        box-shadow: none !important;
        border: none !important;
        display: block !important; 
      }
      /* Classes para evitar quebra no meio da linha/tabela */
      .print-avoid-break { break-inside: avoid; page-break-inside: avoid; }
      tr { break-inside: avoid; page-break-inside: avoid; }
      
      /* Esconde as guias visuais na hora de imprimir */
      .page-guides { display: none !important; }
    }
  `;

  return (
    <div id="app-container" className="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{printStyles}</style>

      <div id="form-sidebar" className="w-full md:w-[450px] bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-xl">
        
        <header className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Seara_Alimentos_logo_%282024%29.svg" 
            alt="Logo Seara" 
            className="h-8 object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="flex gap-2">
            <button 
              onClick={() => setShowGuides(!showGuides)}
              className={`p-2 rounded-md transition-all shadow-sm flex items-center justify-center border ${showGuides ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
              title="Mostrar/Ocultar Guias de Página"
            >
              <Layout size={16} />
            </button>
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all shadow-md flex items-center gap-2 text-sm font-semibold"
            >
              <Printer size={16} />
              Gerar PDF
            </button>
          </div>
        </header>

        <div className="p-6 overflow-y-auto flex-1 space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
          
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlignLeft size={14} /> Detalhes da Reunião
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1">Projeto Fixo</label>
                <div className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-slate-700 font-bold text-sm cursor-default">
                  {PROJECT_NAME}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">Data</label>
                  <input 
                    type="date" name="date" value={formData.date} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-sm outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">Hora</label>
                  <input 
                    type="time" name="time" value={formData.time} onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1">Local / Link</label>
                <input 
                  type="text" name="location" value={formData.location} onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-sm outline-none"
                  placeholder="Ex: Sala de Reuniões / Microsoft Teams"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users size={14} /> Participantes
            </h2>
            
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Membros da Equipa (Marque os presentes)</label>
              <div className="grid grid-cols-2 gap-2">
                {members.map(member => (
                  <label key={member.id} className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${member.present ? 'bg-red-50 border-red-200 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                    <input 
                      type="checkbox" 
                      checked={member.present}
                      onChange={() => toggleMember(member.id)}
                      className="rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer w-4 h-4"
                    />
                    <span className="text-[12px] font-semibold">{member.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Outros / Convidados</label>
              <div className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  value={newAttendee}
                  onChange={(e) => setNewAttendee(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomAttendee(e)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-sm outline-none"
                  placeholder="Nome do participante extra..."
                />
                <button 
                  onClick={addCustomAttendee}
                  className="px-3 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors text-sm font-semibold flex items-center gap-1 shadow-sm"
                >
                  <Plus size={16} /> Add
                </button>
              </div>
              
              {customAttendees.length > 0 && (
                <ul className="space-y-2 mt-3">
                  {customAttendees.map(attendee => (
                    <li key={attendee.id} className="flex justify-between items-center bg-white border border-slate-200 px-3 py-2 rounded-md text-sm text-slate-700 font-medium shadow-sm">
                      {attendee.name}
                      <button onClick={() => removeCustomAttendee(attendee.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Remover convidado">
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlignLeft size={14} /> Tópicos Abordados
            </h2>
            <textarea 
              name="topics" value={formData.topics} onChange={handleInputChange} rows="6"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-sm outline-none resize-none"
              placeholder="Registe os principais pontos e decisões..."
            />
          </section>

          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckSquare size={14} /> Plano de Ação
            </h2>
            
            <div className="space-y-4 mb-4">
              {actions.map((action) => (
                <div key={action.id} className="p-4 bg-white border border-slate-200 rounded-md shadow-sm group relative space-y-3">
                  <input 
                    type="text" placeholder="O que vai ser feito?" value={action.task}
                    onChange={(e) => handleActionChange(action.id, 'task', e.target.value)}
                    className="w-full text-sm outline-none font-semibold text-slate-800 bg-transparent"
                  />
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Responsável</label>
                      <input 
                        type="text" placeholder="Nome" value={action.owner}
                        onChange={(e) => handleActionChange(action.id, 'owner', e.target.value)}
                        className="w-full text-[13px] outline-none text-slate-600 bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Prazo</label>
                      <input 
                        type="date" value={action.deadline}
                        onChange={(e) => handleActionChange(action.id, 'deadline', e.target.value)}
                        className="w-full text-[13px] outline-none text-slate-600 bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Estado</label>
                      <select 
                        value={action.status}
                        onChange={(e) => handleActionChange(action.id, 'status', e.target.value)}
                        className="w-full text-[13px] outline-none text-slate-600 bg-transparent cursor-pointer"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeAction(action.id)}
                    className="absolute -top-3 -right-3 p-1.5 bg-red-50 text-red-500 border border-red-100 rounded-full hover:bg-red-500 hover:text-white shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                    title="Remover"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={addAction}
              className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-md transition-colors flex items-center justify-center gap-2 text-sm font-semibold shadow-sm"
            >
              <Plus size={16} /> Adicionar Nova Tarefa
            </button>
          </section>

          <section className="pb-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar size={14} /> Próxima Reunião
            </h2>
            <div>
              <input 
                type="text" name="nextMeeting" value={formData.nextMeeting} onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all text-sm outline-none"
                placeholder="Ex: 15/11 às 14:00 - Teams"
              />
            </div>
          </section>

        </div>
      </div>

      <div id="preview-container" className="hidden md:flex flex-1 overflow-y-auto justify-center p-8 bg-slate-200/60 relative">
        
        <div 
          id="document-page" 
          className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col relative"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            height: 'max-content',
            padding: '20mm 25mm',
            color: '#1e293b' 
          }}
        >
          {showGuides && (
            <div 
              className="page-guides absolute top-0 left-0 w-full h-full pointer-events-none z-50"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent calc(297mm - 2px), rgba(239, 68, 68, 0.4) calc(297mm - 2px), rgba(239, 68, 68, 0.4) 297mm)',
                backgroundSize: '100% 297mm'
              }}
            >
            </div>
          )}

          <div className="flex-1 relative z-10">
            
            <header className="flex flex-col mb-10 print-avoid-break">
              <div className="flex justify-between items-center mb-6">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Seara_Alimentos_logo_%282024%29.svg" 
                  alt="Logo" 
                  className="h-16 object-contain"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="30"><text x="0" y="20" font-family="sans-serif" font-weight="bold" font-size="20" fill="%23e3000f">SEARA</text></svg>';
                  }}
                />
                <div className="text-right">
                  <h1 className="text-2xl font-light tracking-tight text-slate-800 uppercase">Ata de <span className="font-bold text-red-600">Reunião</span></h1>
                </div>
              </div>
              
              <div className="border-t-2 border-slate-800 pt-4 pb-4 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Projeto / Escopo</span>
                    <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">{PROJECT_NAME}</h2>
                </div>
                <div className="text-right flex gap-8">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Data</span>
                      <span className="text-sm font-semibold text-slate-800">{formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Hora</span>
                      <span className="text-sm font-semibold text-slate-800">{formData.time || '—'}</span>
                    </div>
                </div>
              </div>
            </header>

            <div className="space-y-8">
              
              <div className="text-sm print-avoid-break">
                <div className="w-full min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Local / Formato</span>
                  <span className="font-medium text-slate-700 break-words">{formData.location || '—'}</span>
                </div>
              </div>

              <div className="print-avoid-break">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">
                  Participantes Presentes
                </h3>
                <div>
                  {(members.some(m => m.present) || customAttendees.length > 0) ? (
                    <ul className="flex flex-wrap gap-2 text-sm text-slate-700">
                      {members.filter(m => m.present).map((person) => (
                        <li key={person.id} className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 flex items-center">
                          {person.name}
                        </li>
                      ))}
                      {customAttendees.map((person) => (
                        <li key={person.id} className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                          {person.name} 
                          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider bg-white px-1.5 py-0.5 rounded-full border border-slate-200">Conv.</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-400 italic text-sm">Nenhum participante marcado como presente.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4 print-avoid-break">
                  Pauta e Deliberações
                </h3>
                <div>
                  {formData.topics ? (
                    <div className="whitespace-pre-wrap break-words text-slate-700 text-sm leading-relaxed text-justify">
                      {formData.topics}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-sm">Nenhum registo de discussões preenchido.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4 print-avoid-break">
                  Plano de Ação
                </h3>
                <div>
                  <table className="w-full text-left border-collapse table-fixed">
                    <thead className="print-avoid-break">
                      <tr>
                        <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-2/5 border-b border-slate-200">Ação / Tarefa</th>
                        <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-1/4 border-b border-slate-200">Responsável</th>
                        <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-1/5 border-b border-slate-200">Prazo</th>
                        <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right border-b border-slate-200">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actions.filter(a => a.task || a.owner || a.deadline).length > 0 ? (
                        actions.map((action) => (
                          (action.task || action.owner || action.deadline) && (
                            <tr key={action.id} className="print-avoid-break">
                              <td className="py-3 pr-2 text-sm font-medium text-slate-800 border-b border-slate-100 break-words">{action.task || '—'}</td>
                              <td className="py-3 pr-2 text-sm text-slate-600 border-b border-slate-100 break-words">{action.owner || '—'}</td>
                              <td className="py-3 text-sm text-slate-600 border-b border-slate-100">
                                {action.deadline ? new Date(action.deadline + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}
                              </td>
                              <td className="py-3 text-right border-b border-slate-100">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                                  ${action.status === 'Concluído' ? 'text-green-600 bg-green-50' : 
                                    action.status === 'Em Andamento' ? 'text-blue-600 bg-blue-50' : 
                                    'text-slate-500 bg-slate-100'}
                                `}>
                                  {action.status || 'Pendente'}
                                </span>
                              </td>
                            </tr>
                          )
                        ))
                      ) : (
                        <tr className="print-avoid-break">
                          <td colSpan="4" className="py-6 text-center text-slate-400 italic text-sm border-b border-slate-100">
                            Nenhuma ação pendente gerada.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {formData.nextMeeting && (
                <div className="mt-8 print-avoid-break">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">
                    Agendamento Futuro
                  </h3>
                  <p className="text-sm font-medium text-slate-800">{formData.nextMeeting}</p>
                </div>
              )}

            </div>
          </div>

          <footer className="relative z-10 mt-12 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-medium print-avoid-break">
            <span className="uppercase tracking-widest">Seara - Documento Interno</span>
            <span>Gerado em {new Date().toLocaleDateString('pt-BR')}</span>
          </footer>
          
        </div>
      </div>
      
    </div>
  );
}