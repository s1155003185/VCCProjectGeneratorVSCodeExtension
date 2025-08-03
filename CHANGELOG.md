# Change Log

## [Unreleased] - Review - using namespace vcc and naming rules
- Git Manager Enhancement
- Review naming rule: class variable: _PascalCase / variable: camelCase / function name: camelCase / class name: PascalCase / macro names: UPPER_CASE / enum type name: PascalCase / enumerator name: UPPER_CASE / constant name: UPPER_CASE / namespace name: lowercase
- Remove Action Message, use <typeid> => std::type_info.name() to return message for debug mode
- TODO: Enum Support custom include files
- TODO: Export function name to lowercase with underscore
- TODO: Support Callback in argument
- TODO: Support Structure
- TODO: Support Set for GETSET
- TODO: Review RESERVE and REPLACE tag

### [v0.4.0] - 2025-08-03: Upgrade to support C++23
- Support C++23 (Note: MacOS support C++23 now)

!!! Need to Update All Platform g++ to latest version !!!

Known issue: To fit C++23 compilation, PC Window MSYS is upgraded to latest version. GitServiceTest.StageAndDifference cannot pass. As Window VSCode latest version cannot attach g++ debugger, cannot trace the reason. Mac version does not have this problem and all unittests are passed. May review latter.

After upgrade, find that Window g++ compiler cannto recognize int64_t now. Need to add library <cstdint>.

### [v0.3.7] - 2025-07-27: Review - Review Namespace
- Review using namespace vcc: add vcc:: before function instead of using namespace vcc
- Support namespace in TypeWorkspace

### [v0.3.6] - 2025-06-01: Review - Review Class Macro
- Review GETSET_SPTR and MANAGER_SPTR: initialize in class constructor
- Update vcc.json IsResultThrowException to IsActionResultThrowException
- vcc.json supports ActionHistoryType
- Add tag vccconfig so that setting in project is controlled by vcc.json
- Support GETCUSTOM, SETCUSTOM, GETCUSTOM_SPTR, SETCUSTOM_SPTR
- Support GETSET_VALIDATE, GETSET_VALIDATE_SPTR_NULL, VECTOR_VALIDATE, VECTOR_VALIDATE_SPTR, MAP_VALIDATE, MAP_VALIDATE_SPTR_R, ORDERED_MAP_VALIDATE, ORDERED_MAP_VALIDATE_SPTR_R
- Support one enum with multi class macro
- Class Enum supports @@Include @@Private @@Protected
- Class Property Enum supports @@Initialize
- Review usage of const

### [v0.3.5] - 2025-05-05: Review - vcc.json Grouping
- Group vcc.json

### [v0.3.4] - 2025-04-21: Review - Action Return OperationResult
- Action support return Result - Add Class tag @@Result and Field tag @@Result
- Add OperationResult to return Error Code and Message (Also auto generate at Java Project)

### [v0.3.3] - 2025-03-30: Review - Action Argument
- Review folder and file naming rules. C++ folder must be lowercase without any seperator and file must be lower case with seperator. Java folder must be lowercase without any seperator and file must be having same name as class name
- Action: add macro ACTION_WITH_ARG and ACTION_WITH_ARG_SPTR to handle argument instead of tag @@Class
- Rename all c++ folder to lowercase

### [v0.3.2] - 2025-03-01: Review - Initialize Git Manager
- Git Review
- Add vpm.config.json. Default location is ~/Documents/vcc/config
- Exception Macro add VALIDATE
- Add field attribute @@NoJson

### [v0.3.1] - 2025-02-08: Review - Review Function Name
- Review helper function naming
- Seperate Remove and RemoveObject (function using void * as argument will remove object property and shift pointer. i.e. cannot find object from vector)
- Add ObjectId to IObject for idenitity checking. (Cannot find object from vector as pointer is shifted 8 for some cases)

### [v0.3.0] - 2025-01-26: Review - Review Property Accessor
- Class macro VECTOR, VECTOR_SPTR add Remove method
- Remove memory_macro.hpp
- Review Class Macro and Property Accessor.
    - add AtIndex and AtKey for Vector, Map and Ordered Map. (Compiler cannot distinguish when Ordered Map having int key)
    - Property Accessor Seperate Read, Write, Remove, Clone to Read, ReadAtIndex, ReadAtKey, Write, WriteAtIndex, WriteAtKey, RemoveAtIndex, RemoveAtKey, CloneAtIndex, CloneAtKey. (Compiler cannot distinguish pointer and integer)

### [v0.2.6] - 2025-01-05: Form - Action
- Support @@Thread
- @@Log, @@Action, @@Thread use IsIndependent insead of IsInheritFromParent
- Support Class Macro ACTION, MANAGER_SPTR, MANAGER_SPTR_NULL, MANAGER_SPTR_PARENT
- Add InitializeComponent(), OnInitialzieComponent(), InitialzeValues() and OnInitializeValues()
- Remove Java Form Initialize() and Reload(). Use should use Action to initalize or reload
- Initialzie Action

### [v0.2.5] - 2024-12-08: Form - Generate Java Form
- Form Action - Create, Reload, Close
- Remove BaseObject template (No method to convert IObject and IForm if there is template)
- Fix cannot throw exception when excuting release exe
- Generator Support Action
- Review VCC Tag
- Class Attributes support @@Log and @@Action
- Remove ManagerType and ActionType

### [v0.2.4] - 2024-11-13: Form - Generate Form
- Initialize Form
- Generate Form
- Fix vcc tag using wrong Key "SKIP" instead of "RESERVE"

### [v0.2.3] - 2024-10-20: Form - Generate Inherit Class
- Initialize Application
- Generate Inherit Class
- Rename LogProperty to LogConfig as class suffix and Property and file suffix _property.hpp are reserved
- Merge IProperty and BaseProperty to IObject and BaseObject. Remove i_property.hpp and base_property.hpp
- Support Generate Form and inerted Class from Type Workspace in vcc.json
- Fix Win Version Generator not work

### [v0.2.2] - 2024-10-12: Form - Urgent Fix
- Fix Generator not work

### [v0.2.1] - 2024-10-12: Form - Initialize Thread
- Rename VCCModule Folder to Camel Case to fit java naming style
- VCCProjectGenerator Generation mode update Makefile according to vcc.json
- Drop and Create template in Document/VCC folder if VCCProjectGenerator version not match with template instead of Git Pull
- Remove file form_type.hpp, merge FormType to ObjectType

### [v0.2.0] - 2024-10-03: Form - Initialize Thread
- Initialize Thread, ThreadService, ThreadManager
- LogService add LogDebug and LogThread
- ActionType, ExceptionType, FormType, ManagerType, ObjectType add custom tag

### [v0.1.5] - 2024-09-17: Java Bridge: Generation - Auto Create Java Class and Enum according
- Use void * instead of ITypeUnion for Property Accessor Map Key.
- Generate Java Class according to C++ Enum Class under Type Workspace.
- Update vcc.json and Makefile to export dll, exe to Java project
- Update vcc.json TemplateWorkspace use ${userHome} instead of hardcode.
- Auto copy dll / exe to Java Project
- Fix Update Mode not working because of using // <vcc:exceptionType action:"RESERVE"> in exception_type.hpp instead of // <vcc:exceptionType action="RESERVE">

### [v0.1.4] - 2024-08-25: Java Bridge: Generation - Java Bridege for Enum
- Generate Java Enum according to C++ Enum Class under Type Workspace.

### [v0.1.3] - 2024-07-28: Java Bridge: Generation - Dll Interface for Property Accessor
- Remove support of std::string, all change to use std::wstring
- Generate Dll Interface for Property Accessor
- vcc.json remove WorkspaceDestination, change WorkspaceSourceGitUrl to TemplateGitUrl, WorkspaceSource to TemplateWorkspace
Note: Generation mode need to change WorkspaceDestination if using different PC.

### [v0.1.2] - 2024-07-14: Java Bridge: Generation - Create Class as Json Object with 
- Update Generator: Create Table as Json Object

### [v0.1.1] - 2024-07-08: Java Bridge: Self Writing
- Fix Win Compile
- Update Generator be Self-writting project

### [v0.1.0] - 2024-07-07: Java Bridge: Prepare for generate Java Bridge
- Makefile MacOS extension changed from .so to .dylib
- vcc.json rename ModelDirectory to ObjectDirectory, ObjectDirectory to ObjectDirectoryHpp, added ObjectDirectoryCpp
- Object Factory, Property Accessor Factory
- Generate Class Object with Json Serialize and Deserialize

### [v0.0.5] - 2024-06-02: Basic Strucute: Property Accessor and Thread safe
- Generate Mode supports generate Property Accessor ReadWrite, ReadOnly, WriteOnly, NoAccess
- Class Macro remote STATIC_GET and GET, all class properties must support Get Set and the access mode is controlled by Property Accessor
- Generator support Map (Property Accessor still cannot read key list)
- Rename HasPrefix, HasSuffix in string_helper.hpp to IsStartWith, IsEndWith

### [v0.0.4] - 2024-05-19: Basic Strucute: Merge XML and Improve Try Catch
- Add make unittest in Makefile
- Initial Property Accessor
- Merge XML Reader to XML Builder
- Improve TRY CATCH macro

### [v0.0.3] 2024-05-06: Basic Strucute: Update project according to vcc.json
- Move vcc.json to .vcc/vcc.json
- Update Makefile to fix unittest name
- Trigger Update VCC Module will update Makefile according to vcc.json

### [v0.0.2] 2024-05-05: Basic Strucute: Urgent Fix
- Fix cannot reexecute after switched to tag

### [v0.0.1] 2024-05-05: Basic Strucute: Initialize
- Initialize
