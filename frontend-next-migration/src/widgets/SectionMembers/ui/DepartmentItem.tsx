import { FC } from 'react';
import { Department, Member } from '../model/types';
import cls from './SectionMembers.module.scss';
import MemberItem from './MemberItem';

interface DepartmentItemProps {
  department: Department;
}

const DepartmentItem: FC<DepartmentItemProps> = ({ department }) => (
  <div key={department.id} className={cls.departmentCard}>
    <h2>{department.name}</h2>
    {department.members.length > 0 && (
      <ul className={cls.departmentMembersList}>
        {department.members.map((member: Member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </ul>
    )}
  </div>
);

export default DepartmentItem;
