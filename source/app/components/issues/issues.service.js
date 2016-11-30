function issuesService($api) {
  this.issues = [];

  let cacheIssues = {};
  let cacheLabels = {};

  this.recievedIssues = $api.getIssues().then((issues) => {
    this.issues = issues;
    return issues;
  });

  function getIssuesAndLabels(status='all') {
    if (Object.getOwnPropertyNames(cacheIssues).length == 0){
      cacheIssues = {all: [], open: []};
      cacheLabels = {all: [], open: []};
      for(let i = 0; i < this.issues.length; i++){
        const issue  = this.issues[i];
        const isOpen = issue.state == 'open';
        for(let j = 0; j < issue.labels.length; j++){
          const label = issue.labels[j].name;
          let labelInd = cacheLabels.all.indexOf(label);
          if(labelInd < 0){
            cacheLabels.all.push(label);
            cacheIssues.all.push(1);
          }else{
            cacheIssues.all[labelInd] += 1;
          }
          if (isOpen){
            labelInd = cacheLabels.open.indexOf(label);
            if(labelInd < 0){
              cacheLabels.open.push(label);
              cacheIssues.open.push(1);
            }else{
              cacheIssues.open[labelInd] += 1;
            }
          }
        }
      }
    }
    return {labels : cacheLabels[status], issues : cacheIssues[status]};
  }

  this.getIssuesAndLabels = getIssuesAndLabels;
}

issuesService.$inject = ['$api'];

module.exports = issuesService;
