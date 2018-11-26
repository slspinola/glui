const width = 500;
const height= 300;

export const PieChartDataSevicesState =  {
  chartType: 'PieChart',
  dataTable: [
    ['Sevirços', 'Estado dos serviços'],
    ['Planeado',     2],
    ['Em Execução',      2],
    ['Bloqueado',  2],
    ['Terminado', 2],
  ],
  options: {
    'title': 'Serviços - Estado',
    'width': width,
    'height': height
  },
};

export const PieChartDataSevicesType =  {
  chartType: 'PieChart',
  dataTable: [
    ['Sevirços', 'Tipo dos serviços'],
    ['Recolha',     2],
    ['Limpeza',      2],
    ['Manutenção',  2],
    ['Outro', 2],
  ],
  options: {
    'title': 'Serviços - Tipo',
    'width': width,
    'height': height
  },
};

export let ServicesStats = { 
  state: {
  planned: 0,
  excuting: 0,
  blocked: 0,
  executed: 0,
  },
  type: {
    collection: 0,
    cleaning: 0,
    maintenance: 0,
    other: 0,
  }
}

export const PieChartDataEventState =  {
  chartType: 'PieChart',
  dataTable: [
    ['Ocorrêcias', 'Estado das ocorrências'],
    ['Novo',     2],
    ['Pendente',      2],
    ['Agendado',  2],
    ['Tratado', 2],
  ],
  options: {
    'title': 'Ocorrências - Estado',
    'width': width,
    'height': height
  },
};

export const PieChartDataEventType =  {
  chartType: 'PieChart',
  dataTable: [
    ['Ocorrências', 'Tipo das ocorrêcias'],
    ['Recolha',     2],
    ['Limpeza',      2],
    ['Manutenção',  2],
    ['Outro', 2],
  ],
  options: {
    'title': 'Ocorrências - Tipo',
    'width': width,
    'height': height
  },
};

export let EventStats = { 
  state: {
  new: 0,
  pending: 0,
  scheduled: 0,
  done: 0,
  },
  type: {
    collection: 0,
    cleaning: 0,
    maintenance: 0,
    other: 0,
  }
}