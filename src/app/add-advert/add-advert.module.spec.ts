import { AddAdvertModule } from './add-advert.module';

describe('AddAdvertModule', () => {
  let addAdvertModule: AddAdvertModule;

  beforeEach(() => {
    addAdvertModule = new AddAdvertModule();
  });

  it('should create an instance', () => {
    expect(addAdvertModule).toBeTruthy();
  });
});
