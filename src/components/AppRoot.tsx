import Initialization from './Initialization/Initialization';
import MenuBar from './MenuBar/MenuBar';
import Home from './routes/Home';
import Management from './routes/Management';
import Performance from './routes/Performance';
import Settings from './routes/Settings';

export default function AppRoot() {
  return (
    <>
    <Initialization />
    <Home />
    <Performance />
    <Management />
    <Settings />
    <MenuBar />
    </>
  );
}
