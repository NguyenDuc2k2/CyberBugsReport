/* eslint-disable react-hooks/exhaustive-deps */
import { Router, Switch } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import TemplatesLogin from "./Templates/TemplatesLogin";
import CyberBugsLogin from "./Pages/CyberBugs/CyberBugsLogin";
import { useEffect } from "react";
import { ADD_HISTORY } from "./Redux/Constants/CyberBugs";
import DawerCyberBugs from "./Hoc/DawerCyberBugs/DawerCyberBugs";
import TemplatesCyberBugs from "./Templates/TemplatesCyberBugs";
import MainCyberbugs from "./Pages/ProjectDetail/MainCyberbugs";
import Projectmanagement from "./Pages/CyberBugs/Projectmanagement";
import CreateProject from "./Pages/CyberBugs/CreateProject";
import TemplateUserSignup from "./Templates/TemplateUserSignup/TemplateUserSignup";
import UserSignup from "./Pages/UserSignup/UserSignup";
import PageNotFound from "./Pages/PageNotFound/PageNotFound.";
import UserManagement from "./Pages/ExercisesUserManagemant/UserManagement";




function App() {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ADD_HISTORY, history: history
    })
  }, [])

  return (
    <Router history={history} >
      <DawerCyberBugs />
      <Switch>
        <TemplatesLogin exact path='/login' Component={CyberBugsLogin} />
        <TemplatesCyberBugs exact path='/cyberbugs' Component={MainCyberbugs} />
        <TemplatesCyberBugs exact path='/projectmanagement' Component={Projectmanagement} />
        <TemplatesCyberBugs exact path='/createproject' Component={CreateProject} />
        <TemplatesCyberBugs exact path='/projectdetail/:projectId' Component={MainCyberbugs} />
        <TemplateUserSignup exact path='/usersignup' Component={UserSignup} />
        <TemplatesCyberBugs exact path='/usermanagement' Component={UserManagement} />
        <TemplatesLogin exact path='/' Component={CyberBugsLogin} />
        <PageNotFound path='*' />
      </Switch>
    </Router>
  );
}

export default App;
