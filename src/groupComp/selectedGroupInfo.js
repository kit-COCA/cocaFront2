// SelectedGroupInfo.js
import React, { useState, useEffect } from 'react';
import styles from '../css/GroupPage.module.css';

const SelectedGroupInfo = ({ groupId }) => {
  // 상태 관리를 위한 기본값 설정
  const [group, setGroup] = useState({
    id: 11,
    name: '수정NAME',
    admin: {
      id: 'TESTID1',
      userName: 'TESTNAME1',
      profileImgPath: 'TESTURL1'
    },
    description: '테스트그룹 설명5',
    isPrivate: false,
    hashtags: [
      { id: 1, field: 'IT', name: '스프링' }
    ],
    memberCount: 2
  });
  const [isMember, setIsMember] = useState(false); // 가입여부
  const [isManager, setIsManager] = useState(true); // 관리자 여부를 상태로 관리

  // 컴포넌트 마운트 시 백엔드에서 데이터를 가져오는 효과
  useEffect(() => { //✅ 그룹 상세정보 가져오면됨, 해당그룹 가입여부와 관리자여부는 백엔드측에서 추가해야 할듯
    // TODO: 백엔드에서 그룹 정보를 가져오는 로직 구현
    // fetchGroupInfo().then(data => setGroup(data));
    console.log('그룹 선택2:', groupId);
  }, []);

  // 백엔드와 통신하여 그룹 참가 처리
  const handleJoinGroup = () => {
    // TODO: 백엔드에 그룹 참가 요청 로직 구현
    setIsMember(true);
  };

  // 백엔드와 통신하여 그룹 탈퇴 처리
  const handleLeaveGroup = () => {
    // TODO: 백엔드에 그룹 탈퇴 요청 로직 구현
    setIsMember(false);
  };

  return (
    <div className={styles.selectedGroupInfo}>
      <span className={styles.groupNameTitle}>{group.name}</span>
      <span className={styles.memberCountInfo}>{group.memberCount}명</span>
      <div className={styles.groupInfoBox}>
        <p className={styles.adminName}>[관리자] {group.admin.userName}</p>
        {/* 관리자 프로필 이미지 추가 예정임*/}
      </div>
      <div className={styles.groupInfoBox}>
        <p className={styles.groupDescription}>{group.description}</p>
        {/* 해시태그 배열을 처리하는 방식 변경 */}
        <div className={styles.groupHashtags}>
          {group.hashtags.map((tag) => (
            <span key={tag.id} className={styles.hashtag}>{tag.name}</span>
          ))}
        </div>
      </div>
      {isMember ? (
        <button className={styles.joinButton} onClick={handleLeaveGroup}>탈퇴</button>
      ) : (
        <button className={styles.joinButton} onClick={handleJoinGroup}>참가</button>
      )}
    </div>
  );
};

export default SelectedGroupInfo;
