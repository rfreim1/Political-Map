select sum(transaction_amnt)as REP from cs339.comm_to_cand 
where cs339.comm_to_cand.cand_id in(select cand_id from cs339.candidate_master where cand_pty_affiliation='REP');

select sum(transaction_amnt)as DEM from cs339.comm_to_cand 
where cs339.comm_to_cand.cand_id in(select cand_id from cs339.candidate_master where cand_pty_affiliation='DEM');

select sum(transaction_amnt) as total 
from (
select transaction_amnt from cs339.comm_to_cand 
where cs339.comm_to_cand.cmte_id in 
(select cmte_id from cs339.committee_master natural join cs339.cmte_id_to_geo 
where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80) 
union all 
select transaction_amnt from cs339.comm_to_comm where cs339.comm_to_comm.cmte_id in 
(select cmte_id from cs339.committee_master natural join cs339.cmte_id_to_geo 
where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80));


select sum(transaction_amnt) as indiv 
from cs339.individual natural join
cs339.ind_to_geo where cs339.individual.sub_id in 
(select sub_id from cs339.individual)
and where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80;

select sum(transaction_amnt) as demcolor
from cs339.individual natural join
cs339.ind_to_geo where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80 and cs339.individual.cmte_id in 
(select cmte_id from cs339.committee_master where cmte_pty_affiliation ='DEM');

select sum(transaction_amnt) as demcolor
from cs339.individual natural join
cs339.ind_to_geo where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80 and cs339.individual.cmte_id in 
(select cmte_id from cs339.committee_master where cmte_pty_affiliation ='REP');

select sum(transaction_amnt) as cmtecolordem
from cs339.comm_to_comm natural join
cs339.cmte_id_to_geo where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80 and cmte_id in 
(select cmte_id from cs339.committee_master where cmte_pty_affiliation ='DEM');

select sum(transaction_amnt) as cmtecolorrep
from cs339.comm_to_comm natural join
cs339.cmte_id_to_geo where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80 and cmte_id in 
(select cmte_id from cs339.committee_master where cmte_pty_affiliation ='REP');

select sum(transaction_amnt) as cmtecolorrep
from cs339.comm_to_cand natural join
cs339.cmte_id_to_geo where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80 and cs339.comm_to_cand.cand_id in 
(select cand_id from cs339.candidate_master where cand_pty_affiliation ='REP');

select sum(transaction_amnt) as cmtecolordem
from cs339.comm_to_cand natural join
cs339.cmte_id_to_geo where cycle='1112' and latitude>40 and latitude<43 and longitude>-90 and longitude<-80 and cs339.comm_to_cand.cand_id in 
(select cand_id from cs339.candidate_master where cand_pty_affiliation ='DEM');

quit