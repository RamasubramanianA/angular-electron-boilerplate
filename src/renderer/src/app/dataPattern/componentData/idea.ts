export interface ideaData{
    idea: string;
    title?: string;
    type: 'idea'| 'danger'| 'warning' | 'info';
}

export class alertClasses  {
    idea    = 'alert-success';
    danger  = 'alert-danger';
    warning = 'alert-warning';
    info    = 'alert-info';
  };