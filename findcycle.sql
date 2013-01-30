select longitude, latitude, cand_name from cs339.candidate_master 
natural join cs339.cand_id_to_geo 
where cycle in ('1112', '0708') and
rownum <= 5;


select distinct cycle 
from cs339.individual
group by cycle
order by cycle;