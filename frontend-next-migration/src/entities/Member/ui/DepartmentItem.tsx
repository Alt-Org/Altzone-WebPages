import { FC } from 'react';
import { Department, Member } from '../model/types/types';
import cls from './DepartmentItem.module.scss';
import MemberItem from './MemberItem';

/**
 * Props for the DepartmentItem component.
 */
interface DepartmentItemProps {
  department: Department;
}


/**
 * DepartmentItem component displays information about a specific department.
 * It includes the department's name and a list of members in that department.
 */
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
