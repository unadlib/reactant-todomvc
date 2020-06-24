import { testBed } from 'reactant';
import { TodoService } from './todo.service';

describe('CounterService', () => {
  let module: TodoService;

  beforeEach(() => {
    module = testBed({
      main: TodoService,
      modules: [],
    }).instance;
  });

  test('should be created', () => {
    expect(module instanceof TodoService).toBeTruthy();
  });
});
