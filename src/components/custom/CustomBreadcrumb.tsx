import { SlashIcon } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Link } from 'react-router';

interface Props {
  currentPage: string;
  breadcrumb?: Breadcrumb[];
}

interface Breadcrumb {
  label: string;
  to: string;
}

export const CustomBreadcrumb = ({ currentPage, breadcrumb = [] }: Props) => {
  return (
    <Breadcrumb className='my-5'>
      <BreadcrumbList>
        {/* home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumb.map((crumb) => (
          <div className='flex items-center'>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={crumb.to}>{crumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink className='text-black font-bold'>
            {currentPage}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
