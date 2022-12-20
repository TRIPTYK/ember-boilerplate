const { execSync } = require('child_process');
const { existsSync, readFileSync, rmSync } = require('fs');
const { join } = require('path');

const GENERATE_COMMAND = 'ember g page dashboard';

const SHOULD_GENERATE_PATH = 'app/components/pages/dashboard';
const SHOULD_GENERATE_TEST_PATH =
  'tests/integration/components/pages/dashboard';

const COMPONENT_PATH = join(SHOULD_GENERATE_PATH, 'component.ts');
const TEMPLATE_PATH = join(SHOULD_GENERATE_PATH, 'template.hbs');
const TEST_FILE_PATH = join(SHOULD_GENERATE_TEST_PATH, 'component-test.ts');

const COMPONENT_MATCH_CONTENT =
  'export default class PagesDashboardIndex extends Component<PagesDashboardIndexArgs> {}';

function removeFiles() {
  rmSync(COMPONENT_PATH, { force: true });
  rmSync(TEMPLATE_PATH, { force: true });
  rmSync(TEST_FILE_PATH, { force: true });
}

beforeEach(removeFiles);

it('Creates a page component, template and test file', () => {
  execSync(GENERATE_COMMAND);
  expect(existsSync(COMPONENT_PATH)).toStrictEqual(true);
  expect(existsSync(TEMPLATE_PATH)).toStrictEqual(true);
  expect(existsSync(TEST_FILE_PATH)).toStrictEqual(true);
  expect(readFileSync(COMPONENT_PATH, 'utf-8')).toContain(
    COMPONENT_MATCH_CONTENT
  );
});

afterEach(removeFiles);
