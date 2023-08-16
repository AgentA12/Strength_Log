
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  userSchema.methods.getSortedProgress = function (templateID, sorted) {
    const progress = this.progress.filter((progressObj) => {
      return progressObj.templateId.toString() === templateID.toString();
    });
  
    let sortedProgress;
  
    if (sorted === "asc") {
      sortedProgress = progress.sort((a, b) =>
        a.createdAt > b.createdAt ? -1 : 1
      );
    }
  
    if (sorted === "desc") {
      sortedProgress = progress.sort((a, b) =>
        a.createdAt < b.createdAt ? -1 : 1
      );
    }
  
    return sortedProgress;
  };
  
  userSchema.methods.ExerciseProgress = function (templateID) {
    let progressArr = this.progress.filter((progressObj) => {
      return progressObj.templateId.toString() === templateID;
    });
  
    const result = [...progressArr];
  
    result.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  
    const labels = result.map((progressObject) => {
      return progressObject.dateCompleted;
    });
  
    const aryOfExercises = result[0].exercises.map((exercise) => {
      return { label: exercise.name, data: [] };
    });
  
    result.map((r) => {
      r.exercises.map((e) => {
        aryOfExercises.map((exercise) => {
          exercise.label === e.name ? exercise.data.push(e.weight) : null;
        });
      });
    });
  
    return { dataSets: aryOfExercises, labels: labels };
  };