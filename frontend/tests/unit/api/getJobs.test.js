import axios from 'axios';

import getJobs from '@/api/getJobs';

vi.mock('axios');

describe('getJobs', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Java engineer'
        }
      ]
    });
  });
  it('fetchs jobs that candidates can apply to', async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com:3001/jobs');
  });

  it('extracts jobs from response', async () => {
    const data = await getJobs();
    expect(data).toEqual([
      {
        id: 1,
        title: 'Java engineer'
      }
    ]);
  });
});