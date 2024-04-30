import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';

import JobListing from '@/components/JobResults/JobListing.vue';

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'React developer',
    organization: 'AirBnB',
    locations: ['New York'],
    minimumQualifications: ['Code'],
    ...jobProps
  });
  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          ...jobProps
        }
      }
    });
  };
  it('renders job title', () => {
    const jobProps = createJobProps({ title: 'Web developer' });
    renderJobListing(jobProps);
    expect(screen.getByText('Web developer')).toBeInTheDocument();
  });
  it('renders job organisation', () => {
    const jobProps = createJobProps({ organization: 'Samsung' });
    renderJobListing(jobProps);
    expect(screen.getByText('Samsung')).toBeInTheDocument();
  });
  it('render job location', () => {
    const jobProps = createJobProps({ locations: ['Orlando', 'Jacksonville'] });
    renderJobListing(jobProps);
    expect(screen.getByText('Orlando')).toBeInTheDocument();
    expect(screen.getByText('Jacksonville')).toBeInTheDocument();
  });
  it('render job qualifications', () => {
    const jobProps = createJobProps({
      minimumQualifications: ['Code', 'Develope']
    });
    renderJobListing(jobProps);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Develope')).toBeInTheDocument();
  });
});
