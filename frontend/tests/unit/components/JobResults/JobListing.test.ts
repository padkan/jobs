import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import type { Job } from '@/api/types';
import JobListing from '@/components/JobResults/JobListing.vue';
import { createJob } from '../../../utils/createJob';

describe('JobListing', () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          ...job
        }
      }
    });
  };
  it('renders job title', () => {
    const jobProps = createJob({ title: 'Web developer' });
    renderJobListing(jobProps);
    expect(screen.getByText('Web developer')).toBeInTheDocument();
  });
  it('renders job organisation', () => {
    const jobProps = createJob({ organization: 'Samsung' });
    renderJobListing(jobProps);
    expect(screen.getByText('Samsung')).toBeInTheDocument();
  });
  it('render job location', () => {
    const jobProps = createJob({ locations: ['Orlando', 'Jacksonville'] });
    renderJobListing(jobProps);
    expect(screen.getByText('Orlando')).toBeInTheDocument();
    expect(screen.getByText('Jacksonville')).toBeInTheDocument();
  });
  it('render job qualifications', () => {
    const jobProps = createJob({
      minimumQualifications: ['Code', 'Develope']
    });
    renderJobListing(jobProps);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Develope')).toBeInTheDocument();
  });
});
