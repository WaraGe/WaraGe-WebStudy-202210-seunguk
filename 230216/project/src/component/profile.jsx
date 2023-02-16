import React from "react";

const profileData = {
    apple: {
        name: '김사과',
        description: '학생, 착해요'
    },
    banana: {
        name: '반하나',
        description: '회사원, 잘자요'
    }
}

const Profile = ({match}) => {
    const {username} = match.params;
    const profile = profileData[username];
    //예외처리
    if(!profile) {
        return <div>존재하지 않는 프로필 입니다</div>
    }

  return (
    <div>
      <h2>
        {username}({profile.name})
      </h2>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
