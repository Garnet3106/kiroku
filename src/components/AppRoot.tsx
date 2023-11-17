import Initialization from './routes/Initialization/Initialization';
import MenuBar from './MenuBar/MenuBar';
import Home from './routes/Home/Home';
import Management from './routes/Management/Management';
import Performance from './routes/Performance';
import Settings from './routes/Settings';
import TaskEdit from './routes/TaskEdit';

export default function AppRoot() {
  return (
    <>
    <Initialization />
    <Home />
    <Performance />
    <Management />
    <Settings />
    <TaskEdit />
    <MenuBar />
    </>
  );
}
