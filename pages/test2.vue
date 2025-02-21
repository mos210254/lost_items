<template>
  <div>
    <table class="w-full border border-gray-300 border-collapse">
      <caption class="text-xl font-semibold my-2">
        Statement Summary
      </caption>
      <thead class="bg-gray-100 hidden md:table-header-group">
        <tr>
          <th
            class="px-4 py-2 text-sm font-semibold uppercase tracking-wide border border-gray-300"
          >
            Account
          </th>
          <th
            class="px-4 py-2 text-sm font-semibold uppercase tracking-wide border border-gray-300"
          >
            Due Date
          </th>
          <th
            class="px-4 py-2 text-sm font-semibold uppercase tracking-wide border border-gray-300"
          >
            Amount
          </th>
          <th
            class="px-4 py-2 text-sm font-semibold uppercase tracking-wide border border-gray-300"
          >
            Period
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-gray-50 border border-gray-300 block md:table-row mb-4 md:mb-0"
        >
          <td
            class="px-4 py-2 text-center block md:table-cell"
            data-label="Account"
          >
            <span class="font-semibold md:hidden">Account: </span> Visa - 3412
          </td>
          <td
            class="px-4 py-2 text-center block md:table-cell"
            data-label="Due Date"
          >
            <span class="font-semibold md:hidden">Due Date: </span> 04/01/2016
          </td>
          <td
            class="px-4 py-2 text-center block md:table-cell"
            data-label="Amount"
          >
            <span class="font-semibold md:hidden">Amount: </span> $1,190
          </td>
          <td
            class="px-4 py-2 text-center block md:table-cell"
            data-label="Period"
          >
            <span class="font-semibold md:hidden">Period: </span> 03/01/2016 -
            03/31/2016
          </td>
        </tr>
        <tr
          class="bg-white border border-gray-300 block md:table-row mb-4 md:mb-0"
        >
          <td
            class="px-4 py-2 text-center block md:table-cell"
            data-label="Account"
          >
            <span class="font-semibold md:hidden">Account: </span> Visa - 6076
          </td>
          <td
            class="px-4 py-2 text-center block md:table-cell"
            data-label="Due Date"
          >
            <span class="font-semibold md:hidden">Due Date: </span> 03/01/2016
          </td>
          <td
            class="px-4 py-2 text-center block md:table-cell"
            data-label="Amount"
          >
            <span class="font-semibold md:hidden">Amount: </span> $2,443
          </td>
          <td
            class="px-4 py-2 text-center block md:table-cell"
            data-label="Period"
          >
            <span class="font-semibold md:hidden">Period: </span> 02/01/2016 -
            02/29/2016
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
