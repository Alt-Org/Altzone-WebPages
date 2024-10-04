import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Team } from '@/entities/Member/model/types/types';
import { getMappedMembers, getMappedDepartments } from './mappers';
import { envHelper } from '@/shared/const/envHelper';

// Määritä API slice
export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({ baseUrl: envHelper.strapiApiUrl }),
  endpoints: (builder) => ({
    fetchTeams: builder.query<Team[], string>({
      query: (locale = 'en') => {
        const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';
        return `/teams?locale=${strapiLocale}&populate=departments.localizations,members.Logo,departments.members.Logo`;
      },
      transformResponse: (response: any, meta, arg) => {
        const strapiLocale = arg === 'fi' ? 'fi-FI' : 'en';

        const teams: Team[] = response.data.map((item: any) => {
          let members = getMappedMembers(item.attributes.members?.data || []);
          const departments = getMappedDepartments(
            item.attributes.departments?.data || [],
            strapiLocale,
          );

          const departmentMemberIds = departments.flatMap((dept) =>
            dept.members.map((member) => member.id),
          );
          members = members.filter(
            (member) => !departmentMemberIds.includes(member.id),
          );

          return {
            id: item.id,
            name: item.attributes.Team || item.attributes.Name,
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            locale: item.attributes.locale,
            members,
            departments,
          };
        });

        const orderEn = [
          'Game Design',
          'Mentoring',
          'Programming',
          'Graphics',
          'Sounds',
          'Comic book',
          'Production',
          'Analysis',
          'Art',
          'Game Art Education Package',
          'Other Participants',
          'Special Thanks',
        ];

        const orderFi = [
          'Pelisuunnittelu',
          'Mentorointi',
          'Ohjelmointi',
          'Grafiikka',
          'Äänet',
          'Sarjakuva',
          'Tuotanto',
          'Analyysi',
          'Pelitaiteen opetuspaketti',
          'Muut mukana olleet',
          'Erityiskiitokset',
        ];

        const order = arg === 'fi' ? orderFi : orderEn;

        return teams.sort(
          (a, b) => order.indexOf(a.name) - order.indexOf(b.name),
        );
      },
    }),
  }),
});

export const { useFetchTeamsQuery } = teamApi;
