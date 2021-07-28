import React from 'react';
import { useHistory } from 'react-router';

const HomeScreen = () => {
  const history = useHistory();

  React.useEffect(() => {
    let mounted = true;
    console.log('Hello Worlds');
    if (mounted) {
      console.log('Hello Worlds');
      if (!localStorage.getItem('active')) {
        history.push('/loading/home');
      }
    }
    return () => {
      mounted = false;
    };
  }, [!localStorage.getItem('active')]);

  return (
    <div>
      <div>Home Screen</div>
    </div>
  );
};

export default HomeScreen;
