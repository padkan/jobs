<template>
  <li class="mb-7">
    <router-link
      to="/jobs/results/1"
      class="border-brand-gray-2 hover:shadow-gray mx-auto block rounded border-solid bg-white"
    >
      <div class="border-brand-gray-2 mx-8 border-b border-solid pb-2 pt-5">
        <h2 class="mb-2 text-2xl">
          Technical Program Manager, Perception, Augmented Reality
        </h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5"><span>Next Job</span></div>
          <div><span>San Francisco, CA, USA</span></div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>
          <h3 class="mb-2 mt-1">Qualifications</h3>
          <div>
            <ul class="list-disc pl-8">
              <li>Bachelor 's degree or equivalent practical exprience.'</li>
              <li>5 years of exprenebce in program management.</li>
              <li>
                Experience analyzing data through querying database (e.q ., SQL)
                using spreadsheet software, and creating statistical models.
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <router-link to="/jobs/results/1" class="text-brand-blue-1">
            Expand
          </router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script>
export default {
  name: 'JobListing'
};
</script>
